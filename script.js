$(document).ready(function () {

  var media = 0;

  function paraNumero(texto) {
    return parseFloat(texto.replace(",", "."));
  }

  function notaValida(n) {
    return !isNaN(n) && n >= 0 && n <= 10;
  }

  // ------------------- BOTÃO CALCULAR MÉDIA -------------------
  $("#btnCalcular").on("click", function () {      // <-- FALTAVA ESTA LINHA

    $("#blocoFinal").hide();
    $("#notaFinal").val("").removeClass("erro");
    $("#resultadoFinal").text("");

    var nome = $("#nome").val().trim();
    var soma = 0;
    var tudoOk = true;

    $(".nota").each(function () {
      var n = paraNumero($(this).val());
      if (notaValida(n)) {
        $(this).removeClass("erro");
        soma += n;
      } else {
        $(this).addClass("erro");
        tudoOk = false;
      }
    });

    if (nome === "") {
      alert("Informe o nome do aluno");
      return;
    }
    if (!tudoOk) {
      alert("Cada nota deve ser um número de 0 a 10 (ex.: 3,7).");
      return;
    }

    media = soma / 4;
    media = parseFloat(media.toFixed(2));
    $("#media").val(media.toFixed(2).replace(".", ","));

    // ------------------- REGRAS DO RESULTADO -------------------
    if (media < 4) {
      $("#resultado").text(nome + ": REPROVADO").css("color", "red");
    } else if (media < 6) {
      $("#resultado").text(nome + ": DE FINAL").css("color", "orange");
      $("#blocoFinal").show();
    } else {                                        // <-- FALTAVA ESTE else
      $("#resultado").text(nome + ": APROVADO").css("color", "green");
    }

  });                                               // <-- FECHA o clique do btnCalcular

  // ------------------- BOTÃO RESULTADO DA FINAL -------------------
  $("#btnFinal").on("click", function () {
    var final = paraNumero($("#notaFinal").val());

    if (!notaValida(final)) {
      $("#notaFinal").addClass("erro");
      alert("A nota da final deve ser um número de 0 a 10");
      return;
    }
    $("#notaFinal").removeClass("erro");

    if (media + final >= 10) {
      $("#resultadoFinal").text("APROVADO na final!").css("color", "green");
    } else {
      $("#resultadoFinal").text("REPROVADO na final.").css("color", "red");
    }
  });

});