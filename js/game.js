const numDivs = 36;
const maxHits = 10;

let hits = 0;
let firstHitTime = 0;
let fails = 0;

function round() {

  $('.target').removeClass("target"); // FIXME: убрал "target" прежде чем искать новый
  $('.miss').removeClass("miss"); // FIXME: убрал ""miss" прежде чем искать новый

  let divSelector = randomDivId();

  $(divSelector).addClass("target");

  $(divSelector).text(hits+1); // TODO: пометил target текущим номером


  // if (hits === 1) {
  //   firstHitTime = getTimestamp(); // FIXME: определил при первом клике firstHitTime
  // }

  if (hits === maxHits) {
    endGame();
  }
}

function endGame() {

  $('.game-field').hide(); // FIXME: спрятал игровое поле сначала. НЕ работает

  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);
  $("#total-fails").text(fails);

  $("#win-message").removeClass("d-none");
  $("#button-reload").removeClass("d-none");
}

function handleClick(event) {

  if ($(event.target).hasClass("target")) {
    hits = hits + 1;
    $(event.target).text(''); // FIXME: убрал текст со старых таргетов. Кажется есть .text?
      round();
  }
  else {
    $(event.target).addClass("miss"); // TODO: как-то отмечать если мы промахнулись? См CSS класс .miss
    fails += 1;
  }

}

function init() {

  $(".game-field").click(handleClick);
  $("#button-reload").click(function() {
    location.reload();
  });
    // TODO: заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке
  $("#button-start").click(function() {
    $("#button-start").addClass('d-none')
    round();
    firstHitTime = getTimestamp();
  });

}

$(document).ready(init);
