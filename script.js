function showScreen(screenId) {
    // すべての画面を隠す
    document.querySelectorAll('.screen').forEach(function(s) {
        s.classList.add('hidden');
    });
    // 指定した画面を表示する
    const target = document.getElementById(screenId);
    if (target) {
        target.classList.remove('hidden');
    }
}
