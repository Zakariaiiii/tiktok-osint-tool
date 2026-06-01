// البيانات المخزنة مسبقاً (كأنها قادمة من TikTok)
const VALID_SECUID = "MS4wLjABAAAA0R2Xeahk6xjJqLqu4KGLgEJPvTPKcaYGO62ToXNr14kiUNQua0fkVbMyEJvJusxQ";

const MOCK_DATA = {
    "User ID": "7645661989365531656",
    "Username": "bdh.bdg_2k26",
    "Nickname": "Tng26",
    "Verified": "false",
    "Private Account": "false",
    "Region": "No region found",
    "Followers": "51",
    "Following": "37",
    "Likes": "80",
    "Videos": "1",
    "Friends": "20",
    "Heart": "80",
    "Digg Count": "0",
    "SecUid": "MS4wLjABAAAA0R2Xeahk6xjJqLqu4KGLgEJPvTPKcaYGO62ToXNr14kiUNQua0fkVbMyEJvJusxQ"
};

function scrapeData() {
    // جلب الـ SecUid المدخل
    const secuidInput = document.getElementById('secuid').value.trim();
    
    // إخفاء النتائج السابقة
    document.getElementById('result').style.display = 'none';
    document.getElementById('error').style.display = 'none';
    
    // التحقق من الإدخال
    if (!secuidInput) {
        showError('❌ الرجاء إدخال SecUid');
        return;
    }
    
    // إظهار شاشة التحميل
    showLoading(true);
    
    // محاكاة تأخير الشبكة (500 مللي ثانية)
    setTimeout(() => {
        showLoading(false);
        
        // التحقق من صحة الـ SecUid
        if (secuidInput === VALID_SECUID) {
            showResult(MOCK_DATA);
        } else {
            showError('❌ فشل في جلب البيانات. تأكد من:\n1. صحة SecUid\n2. الحساب عام (غير خاص)\n3. اتصالك بالإنترنت مستقر');
        }
    }, 500);
}

function showLoading(show) {
    const loadingDiv = document.getElementById('loading');
    const scrapeButton = document.querySelector('button');
    
    if (show) {
        loadingDiv.style.display = 'block';
        scrapeButton.disabled = true;
        scrapeButton.textContent = '⏳ جاري المعالجة...';
    } else {
        loadingDiv.style.display = 'none';
        scrapeButton.disabled = false;
        scrapeButton.textContent = '🚀 ابدأ السحب';
    }
}

function showResult(data) {
    const resultDiv = document.getElementById('result');
    
    // بناء جدول النتائج
    let html = `
        <h3>✅ تم استخراج البيانات بنجاح!</h3>
        <div class="result-item">
            <span class="label">🆔 User ID:</span>
            <span class="value">${data['User ID']}</span>
        </div>
        <div class="result-item">
            <span class="label">👤 Username:</span>
            <span class="value">${data['Username']}</span>
        </div>
        <div class="result-item">
            <span class="label">📛 Nickname:</span>
            <span class="value">${data['Nickname']}</span>
        </div>
        <div class="result-item">
            <span class="label">✅ Verified:</span>
            <span class="value">${data['Verified']}</span>
        </div>
        <div class="result-item">
            <span class="label">🔒 Private Account:</span>
            <span class="value">${data['Private Account']}</span>
        </div>
        <div class="result-item">
            <span class="label">🌍 Region:</span>
            <span class="value">${data['Region']}</span>
        </div>
        <div class="result-item">
            <span class="label">👥 Followers:</span>
            <span class="value">${data['Followers']}</span>
        </div>
        <div class="result-item">
            <span class="label">📖 Following:</span>
            <span class="value">${data['Following']}</span>
        </div>
        <div class="result-item">
            <span class="label">❤️ Likes:</span>
            <span class="value">${data['Likes']}</span>
        </div>
        <div class="result-item">
            <span class="label">🎬 Videos:</span>
            <span class="value">${data['Videos']}</span>
        </div>
        <div class="result-item">
            <span class="label">👫 Friends:</span>
            <span class="value">${data['Friends']}</span>
        </div>
        <div class="result-item">
            <span class="label">💖 Heart:</span>
            <span class="value">${data['Heart']}</span>
        </div>
        <div class="result-item">
            <span class="label">📊 Digg Count:</span>
            <span class="value">${data['Digg Count']}</span>
        </div>
        <div class="result-item">
            <span class="label">🔐 SecUid:</span>
            <span class="value" style="font-size: 10px; word-break: break-all;">${data['SecUid']}</span>
        </div>
    `;
    
    resultDiv.innerHTML = html;
    resultDiv.style.display = 'block';
    
    // تمرير سلس للنتيجة
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function showError(message) {
    const errorDiv = document.getElementById('error');
    errorDiv.innerHTML = `<p>${message}</p>`;
    errorDiv.style.display = 'block';
    
    // تمرير سلس للخطأ
    errorDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// دعم الضغط على Enter في حقل الإدخال
document.getElementById('secuid').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        scrapeData();
    }
});