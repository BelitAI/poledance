import { jest } from "@jest/globals";
import bcrypt from "bcrypt";
import { registrarUsuaria, iniciarSesion } from "../src/services/auth.service.js";

test("el registro protege la contraseña y asigna el rol user", async () => {
  const datos = {
    nombre: "Ana",
    email: "ana@ejemplo.com",
    password: "clave-de-prueba",
    rol: "admin",
  };

  const modeloSimulado = {
    create: jest.fn().mockImplementation(async (datosGuardados) => datosGuardados),
  };

  const resultado = await registrarUsuaria(modeloSimulado, datos);
  const datosGuardados = modeloSimulado.create.mock.calls[0][0];

  expect(datosGuardados.rol).toBe("user");
  expect(datosGuardados.password).not.toBe(datos.password);
  expect(await bcrypt.compare(datos.password, datosGuardados.password)).toBe(true);
  expect(resultado).not.toHaveProperty("password");
});

test("rechaza el registro si falta la contraseña", async () => {
  const datos = {
    nombre: "Ana",
    email: "ana@ejemplo.com",
  };

  const modeloSimulado = {
    create: jest.fn(),
  };

  await expect(registrarUsuaria(modeloSimulado, datos)).rejects.toMatchObject({
    statusCode: 400,
  });

  expect(modeloSimulado.create).not.toHaveBeenCalled();
});

test("permite iniciar sesión con una contraseña correcta", async () => {
  const passwordHash = await bcrypt.hash("clave-de-prueba", 10);

  const usuaria = {
    _id: "123",
    nombre: "Ana",
    email: "ana@ejemplo.com",
    password: passwordHash,
    rol: "user",
  };

  const modeloSimulado = {
    findOne: jest.fn().mockReturnValue({
      select: jest.fn().mockResolvedValue(usuaria),
    }),
  };

  const resultado = await iniciarSesion(modeloSimulado, {
    email: "ana@ejemplo.com",
    password: "clave-de-prueba",
  });

  expect(resultado.email).toBe("ana@ejemplo.com");
  expect(resultado).not.toHaveProperty("password");
});

test("rechaza el inicio de sesión con una contraseña incorrecta", async () => {
  const passwordHash = await bcrypt.hash("clave-correcta", 10);

  const modeloSimulado = {
    findOne: jest.fn().mockReturnValue({
      select: jest.fn().mockResolvedValue({ password: passwordHash }),
    }),
  };

  await expect(
    iniciarSesion(modeloSimulado, {
      email: "ana@ejemplo.com",
      password: "clave-incorrecta",
    })
  ).rejects.toMatchObject({
    message: "Credenciales incorrectas",
    statusCode: 401,
  });
});

test("rechaza el inicio de sesión si la usuaria no existe", async () => {
  const modeloSimulado = {
    findOne: jest.fn().mockReturnValue({
      select: jest.fn().mockResolvedValue(null),
    }),
  };

  await expect(
    iniciarSesion(modeloSimulado, {
      email: "desconocida@ejemplo.com",
      password: "clave-de-prueba",
    })
  ).rejects.toMatchObject({
    message: "Credenciales incorrectas",
    statusCode: 401,
  });
});

test("rechaza el inicio de sesión si falta la contraseña", async () => {
  const modeloSimulado = {
    findOne: jest.fn().mockReturnValue({
      select: jest.fn().mockResolvedValue({
        password: "hash-de-ejemplo",
      }),
    }),
  };

  await expect(
    iniciarSesion(modeloSimulado, {
      email: "ana@ejemplo.com",
    })
  ).rejects.toMatchObject({
    statusCode: 400,
  });
});