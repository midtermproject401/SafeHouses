(function($) {
    function iframeModalOpen() {
      // impostiamo gli attributi da aggiungere all'iframe es: data-src andrà ad impostare l'url dell'iframe
      $('.modalButton').on('click', function(e) {
        var src = $(this).attr('data-src');
        var width = $(this).attr('data-width') || 640; // larghezza dell'iframe se non impostato usa 640
        var height = $(this).attr('data-height') || 360; // altezza dell'iframe se non impostato usa 360
        var allowfullscreen = $(this).attr('data-video-fullscreen'); // impostiamo sul bottone l'attributo allowfullscreen se è un video per permettere di passare alla modalità tutto schermo
        // stampiamo i nostri dati nell'iframe
        $("#myModal iframe").attr({
          'src': src,
          'height': height,
          'width': width,
          'allowfullscreen': ''
        });
      });
      // se si chiude la modale resettiamo i dati dell'iframe per impedire ad un video di continuare a riprodursi anche quando la modale è chiusa
      $('#myModal').on('hidden.bs.modal', function() {
        $(this).find('iframe').html("");
        $(this).find('iframe').attr("src", "");
      });
    }
    $(document).ready(function() {
      iframeModalOpen();
    });
  })(jQuery);