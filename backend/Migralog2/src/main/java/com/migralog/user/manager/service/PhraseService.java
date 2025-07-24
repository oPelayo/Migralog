package com.migralog.user.manager.service;

import com.migralog.user.manager.dto.PhraseDTO;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.util.logging.Logger;

@Service
public class PhraseService {

    private final RestTemplate restTemplate;
    private PhraseDTO cachedPhrase;
    private LocalDate lastFetchDate;

    private static final Logger logger = Logger.getLogger(PhraseService.class.getName());

    public PhraseService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public synchronized PhraseDTO getPhraseDay() {
        LocalDate today = LocalDate.now();

        // Si ya se obtuvo la frase hoy, se devuelve desde caché
        if (cachedPhrase != null && today.equals(lastFetchDate)) {
            logger.info("Devolviendo frase desde caché");
            return cachedPhrase;
        }

        try {
            String html = restTemplate.getForObject("https://proverbia.net/frase-del-dia", String.class);
            if (html == null) {
                throw new RuntimeException("No se pudo descargar la página.");
            }

            Document doc = Jsoup.parse(html);
            Element quoteBlock = doc.selectFirst("blockquote.bsquote");

            if (quoteBlock == null) {
                throw new RuntimeException("No se encontró el bloque blockquote.qotd-home");
            }

            String phrase = quoteBlock.selectFirst("p") != null
                    ? quoteBlock.selectFirst("p").text() : "";

            Element footer = quoteBlock.selectFirst("footer");
            String author = "";
            String detail = "";

            if (footer != null) {
                Element authorLink = footer.selectFirst("a");
                if (authorLink != null) {
                    author = authorLink.text();
                }
                detail = footer.text().replace(author, "").trim();
            }

            cachedPhrase = new PhraseDTO(phrase, author, detail);
            lastFetchDate = today;
            logger.info("Frase actualizada y guardada en caché.");

            return cachedPhrase;

        } catch (Exception e) {
            logger.severe("Error al obtener la frase del día: " + e.getMessage());
            return null;
        }
    }
}
