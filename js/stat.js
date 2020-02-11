'use strict';

(function () {
  var RECT_WIDTH = 420; // Ширина обёртки куда будет выводиться статистика, дальше просто обёртка
  var RECT_HEIGHT = 270; // Высота обёртки
  var RECT_X = 100; // Позиция обёртки по оси X
  var RECT_Y = 10; // Позиция обёртки по оси Y
  var GAP = 10; // Отступ для тени от обёртки
  var RECT_PADDING = 20; // Внутренний отступ от границ обёртки
  var BAR_WIDTH = 40; // Ширина колонки статистики
  var BAR_MAX_HEIGHT = 150; // Максимальная высота колонки
  var BAR_MARGIN = 50; // Растояние между колонками
  var BAR_PADDING_LEFT = 50; // Отступ от левого края обёртки для колонок
  var TITLE_FONT = '16px PT Mono'; // Стили для текста заголовка
  var TITLE_Y = RECT_PADDING * 2; // Отступ от верхней границы обёртки для заголовка

  // Отрисовка прямоугольника внутри canvas
  var renderRect = function (ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, RECT_WIDTH, RECT_HEIGHT);
  };

  window.renderStatistics = function (ctx, names, times) {
    var maxPoint = Math.round(window.utils.getHighestValue(times));

    // Отрисовка обёртки и её тени
    renderRect(ctx, RECT_X + GAP, RECT_Y + GAP, 'rgba(0,0,0,0.7)');
    renderRect(ctx, RECT_X, RECT_Y, 'white');

    // Отрисовка заголовка
    ctx.font = TITLE_FONT;
    ctx.fillStyle = 'black';
    ctx.fillText('Ура вы победили!', RECT_X + RECT_PADDING, TITLE_Y);
    ctx.fillText('Список результатов:', RECT_X + RECT_PADDING, TITLE_Y + RECT_PADDING);

    // Перебор через цикл всех игроков
    for (var i = 0; i < names.length; i++) {
      var random = Math.random() * 100;
      var marginBar = (BAR_MARGIN + BAR_WIDTH) * i;
      var barColor = (names[i] === 'Вы') ? 'rgba(255, 0, 0, 1)' : 'hsl(240,' + Math.round(random) + '%, 50%)';
      var barHeight = times[i] * BAR_MAX_HEIGHT / maxPoint;

      // Отрисовка количества очков игроков
      ctx.fillText(Math.round(times[i]), RECT_X + marginBar + BAR_PADDING_LEFT, RECT_HEIGHT - GAP - RECT_PADDING - barHeight - GAP);

      // Отрисовка колонок игроков
      ctx.fillStyle = barColor;
      ctx.fillRect(RECT_X + marginBar + BAR_PADDING_LEFT, RECT_HEIGHT - GAP - RECT_PADDING - barHeight, BAR_WIDTH, barHeight);

      // Отрисовка имени игроков
      ctx.fillStyle = 'rgba(0, 0, 0, 1)';
      ctx.fillText(names[i], RECT_X + marginBar + BAR_PADDING_LEFT, RECT_HEIGHT - GAP);
    }
  };
})();
