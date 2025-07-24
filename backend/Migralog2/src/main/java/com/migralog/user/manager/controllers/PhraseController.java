package com.migralog.user.manager.controllers;

import com.migralog.user.manager.dto.PhraseDTO;
import com.migralog.user.manager.service.PhraseService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/phrase")
public class PhraseController {
    private final PhraseService phraseService;

    public PhraseController(PhraseService phraseService) {
        this.phraseService = phraseService;
    }

    @GetMapping
    public ResponseEntity<?> getPhrase() {
        PhraseDTO dto = phraseService.getPhraseDay();
        if (dto == null) {
            return ResponseEntity.status(500).body("Can't get Phrase of the day");
        }
        return ResponseEntity.ok(dto);
    }

}