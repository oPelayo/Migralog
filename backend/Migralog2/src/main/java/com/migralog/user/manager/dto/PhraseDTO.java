package com.migralog.user.manager.dto;

public class PhraseDTO {

    private String phrase;
    private String author;
    private String detail;

    public PhraseDTO() {
    }

    public PhraseDTO(String phrase, String autor, String detail) {
        this.phrase = phrase;
        this.author = autor;
        this.detail = detail;
    }

    public String getPhrase() {
        return phrase;
    }

    public void setPhrase(String phrase) {
        this.phrase = phrase;
    }

    public String getAuthor() {
        return author;
    }

    public void setAutor(String autor) {
        this.author = author;
    }

    public String getDetail() {
        return detail;
    }

    public void setDetail(String detail) {
        this.detail = detail;
    }

}