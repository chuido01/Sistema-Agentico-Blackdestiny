/* umbrales.js — Umbrales de alerta por arquetipo. Editable desde el panel
   (sección Ajustes → botón Guardar). semaforo.js lo lee como window.FLEET_UMBRALES
   y lo fusiona sobre sus valores de fábrica. Generado por el panel; una sola fuente viva. */
window.FLEET_UMBRALES = {
  control: {"backupObligatorio":true,"backupAmbar":7,"backupRojo":14,"claudeKB":16,"huerfanas":12},
  agentico: {"backupObligatorio":true,"backupAmbar":5,"backupRojo":10,"claudeKB":16,"huerfanas":12},
  tradicional: {"backupObligatorio":true,"backupAmbar":5,"backupRojo":10,"claudeKB":12,"huerfanas":12},
  simple: {"backupObligatorio":false,"backupAmbar":null,"backupRojo":null,"claudeKB":12,"huerfanas":20}
};
