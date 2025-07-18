@RestController
public class HealthController {

    @GetMapping("/api/test")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("Migralog backend activo");
    }
}
