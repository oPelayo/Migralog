package com.migralog.user.manager.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class FraseDelDiaController {

    @CrossOrigin(origins = "http://localhost:80")
    @GetMapping("/frase-del-dia")
    public String obtenerFraseDelDia() {

        String apiUrl = "https://frasedeldia.azurewebsites.net/api/phrase";

        RestTemplate restTemplate = new RestTemplate();

        // Make GET request to external API and get the phrase of the day
        String fraseDelDia = restTemplate.getForObject(apiUrl, String.class);

        return fraseDelDia;
    }
}
