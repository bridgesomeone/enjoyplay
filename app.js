// カウントダウンタイマーの実装
function initCountdown() {
    // ターゲット日時: 2026年2月22日 09:00
    const targetDate = new Date('2026-02-22T09:00:00').getTime();
    
    // DOM要素の取得
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    
    // カウントダウンを更新する関数
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;
        
        // イベントが終了している場合
        if (distance < 0) {
            daysElement.textContent = '00';
            hoursElement.textContent = '00';
            minutesElement.textContent = '00';
            secondsElement.textContent = '00';
            
            // カウントダウンエリア全体にメッセージを表示
            const countdownContainer = document.getElementById('countdown').parentElement;
            countdownContainer.innerHTML = '<p class="text-center text-lg font-bold text-blue-600">開催中または終了しました</p>';
            
            return;
        }
        
        // 時間の計算
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // 2桁表示にフォーマット
        daysElement.textContent = String(days).padStart(2, '0');
        hoursElement.textContent = String(hours).padStart(2, '0');
        minutesElement.textContent = String(minutes).padStart(2, '0');
        secondsElement.textContent = String(seconds).padStart(2, '0');
    }
    
    // 初回実行
    updateCountdown();
    
    // 1秒ごとに更新
    setInterval(updateCountdown, 1000);
}

// トースト通知の実装
function initToast() {
    const toast = document.getElementById('toast');
    const closeButton = document.getElementById('toast-close');
    
    // 3秒後にトーストを表示
    setTimeout(() => {
        toast.classList.add('show');
    }, 3000);
    
    // 閉じるボタンのイベントリスナー
    closeButton.addEventListener('click', () => {
        toast.classList.remove('show');
    });
    
    // トースト外をクリックしても閉じる（オプション）
    toast.addEventListener('click', (e) => {
        if (e.target === toast) {
            toast.classList.remove('show');
        }
    });
}

// スムーズスクロールの実装（補助）
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// スクロールアニメーションの実装（オプション）
function initScrollAnimation() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // アニメーション対象の要素を監視
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// ページ読み込み時の初期化
document.addEventListener('DOMContentLoaded', () => {
    // カウントダウンタイマーを初期化
    initCountdown();
    
    // トースト通知を初期化
    initToast();
    
    // スムーズスクロールを初期化
    initSmoothScroll();
    
    // スクロールアニメーションを初期化（オプション）
    initScrollAnimation();
    
    // コンソールにメッセージを表示
    console.log('%c銀座ピックルボール交流会へようこそ！', 'color: #2563eb; font-size: 20px; font-weight: bold;');
    console.log('イベントの詳細はページをご覧ください。');
});

// ウィンドウのリサイズ処理（必要に応じて）
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // リサイズ後の処理があればここに記述
        console.log('Window resized');
    }, 250);
});

// エラーハンドリング
window.addEventListener('error', (e) => {
    console.error('エラーが発生しました:', e.error);
});

// パフォーマンス測定（開発用）
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`ページの読み込み時間: ${loadTime.toFixed(2)}ms`);
});
