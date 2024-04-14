package com.migralog.user.manager.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class FraseDelDiaController {

    @CrossOrigin // Habilitar CORS para este controlador
    @GetMapping("/frase-del-dia")
    public String obtenerFraseDelDia() {
        // URL de la API externa de frases celebres
        String apiUrl = "https://frasedeldia.azurewebsites.net/api/phrase";

        // Crear una instancia de RestTemplate para realizar la solicitud HTTP
        RestTemplate restTemplate = new RestTemplate();

        // Realizar la solicitud GET a la API externa y obtener la frase del día
        String fraseDelDia = restTemplate.getForObject(apiUrl, String.class);

        // Devolver la frase del día al cliente
        return fraseDelDia;
    }
}
