import { jest } from "@jest/globals";
import bcrypt from "bcrypt";
import { registrarUsuaria } from "../src/services/auth.service.js";

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