// 1. 顯示當前時間
function updateTime() {
    const timeElement = document.getElementById('current-time');
    if (timeElement) {
        const now = new Date();
        const year = now.getFullYear();
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');

        timeElement.textContent = `現在時間：${year}年${month}月${day}日 ${hours}:${minutes}:${seconds}`;
    }
}
setInterval(updateTime, 1000); // 每秒更新一次時間
updateTime(); // 頁面載入時先更新一次

// 2. 回到頂部的按鈕
// 當用戶滾動頁面時，顯示或隱藏按鈕
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    const mybutton = document.getElementById("myBtn");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

// 當用戶點擊按鈕時，滾動到頁面頂部
function topFunction() {
    document.body.scrollTop = 0; // 對於 Safari
    document.documentElement.scrollTop = 0; // 對於 Chrome, Firefox, IE 和 Opera
}

// 3. 頭像懸停動畫 (Hover Animation on Profile Photo)
const profilePhoto = document.querySelector('.profile-photo');
if (profilePhoto) {
    profilePhoto.addEventListener('mouseover', () => {
        profilePhoto.style.transform = 'scale(1.2)'; // 懸停時放大 1.2 倍
        profilePhoto.style.border = '5px solid #00FFFF'; // 懸停時邊框顏色
    });

    profilePhoto.addEventListener('mouseout', () => {
        profilePhoto.style.transform = 'scale(1)'; // 移開時恢復原狀
        profilePhoto.style.border = '3px solid #007bff'; // 移開時恢復原狀
    });
}

// 4. 技能列表滾動觸發動畫 (Scroll-triggered Animation for Skills)
function checkSkillsVisibility() {
    // 只選取初始可見的技能項目來執行滾動動畫
    const initialSkillItems = document.querySelectorAll('.skills-list li:not(#more-skills-list li)'); 

    initialSkillItems.forEach((item, index) => {
        const itemTop = item.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (itemTop < windowHeight * 0.8) {
            setTimeout(() => {
                item.style.opacity = 1;
                item.style.transform = 'translateY(0)';
            }, index * 200);
        }
    });
}
window.addEventListener('scroll', checkSkillsVisibility);
checkSkillsVisibility(); // 頁面載入時也檢查一次

// 5. 聯絡區塊頁面載入動畫 (Load Animation for Contact Section)
const contactSection = document.querySelector('.contact');
if (contactSection) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            contactSection.style.opacity = 1;
            contactSection.style.transform = 'scale(1)';
        }, 800);
    });
}

// 6. 背景顏色控制拉桿功能
const bgColorSlider = document.getElementById('bgColorSlider');
const body = document.body;
const mainContent = document.querySelector('main');
const headerH1 = document.querySelector('header h1');
const currentTimeElement = document.getElementById('current-time');
const h2Elements = document.querySelectorAll('h2');
const aElements = document.querySelectorAll('a');
const colorControlWrapper = document.querySelector('.color-control-wrapper');
const colorControlLabel = document.querySelector('.color-control-wrapper label');


if (bgColorSlider) {
    // 初始化背景顏色為白色（value="0" 對應白色）
    body.style.backgroundColor = '#ffffff';

    bgColorSlider.addEventListener('input', () => {
        const sliderValue = bgColorSlider.value;
        const grayScale = Math.round(255 * (1 - sliderValue / 100));
        const hex = grayScale.toString(16).padStart(2, '0');
        const bgColor = `#${hex}${hex}${hex}`;

        body.style.backgroundColor = bgColor;

        // 動態調整文字和其他元素的顏色以保持可讀性
        if (grayScale < 128) { // 背景偏暗
            body.style.color = '#eee';
            mainContent.style.backgroundColor = 'rgba(255,255,255,0.15)';
            mainContent.style.boxShadow = '0 0 15px rgba(255,255,255,0.2)';
            
            h2Elements.forEach(h2 => {
                h2.style.color = '#00FFFF';
                h2.style.borderColor = '#00FFFF';
            });
            // 選取所有技能列表的 li 元素來調整顏色
            document.querySelectorAll('ul.skills-list li').forEach(li => {
                li.style.backgroundColor = 'rgba(255,255,255,0.25)';
                li.style.color = '#FFF';
            });
            aElements.forEach(a => a.style.color = '#00FFFF');
            
            headerH1.style.color = '#FFF'; 
            currentTimeElement.style.color = '#FFF';

            if (colorControlWrapper) {
                colorControlWrapper.style.backgroundColor = 'rgba(255,255,255,0.15)';
                colorControlWrapper.style.boxShadow = '0 0 15px rgba(255,255,255,0.2)';
            }
            if (colorControlLabel) {
                colorControlLabel.style.color = '#eee';
            }

        } else { // 背景偏亮
            body.style.color = '#333';
            mainContent.style.backgroundColor = '#fff';
            mainContent.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
            
            h2Elements.forEach(h2 => {
                h2.style.color = '#007bff';
                h2.style.borderColor = '#007bff';
            });
            // 選取所有技能列表的 li 元素來調整顏色
            document.querySelectorAll('ul.skills-list li').forEach(li => {
                li.style.backgroundColor = '#e9ecef';
                li.style.color = '#555';
            });
            aElements.forEach(a => a.style.color = '#007bff');

            headerH1.style.color = '#FFF';
            currentTimeElement.style.color = '#FFF';

            if (colorControlWrapper) {
                colorControlWrapper.style.backgroundColor = '#fff';
                colorControlWrapper.style.boxShadow = '0 0 8px rgba(0, 0, 0, 0.05)';
            }
            if (colorControlLabel) {
                colorControlLabel.style.color = '#555';
            }
        }
    });
}

// 7. 技能列表懸停圖片顯示 & 8. 顯示/隱藏更多技能功能 (合併並使用事件委派)
const skillsContainer = document.querySelector('.skills'); // 選取技能區塊的父容器
const showMoreSkillsBtn = document.getElementById('show-more-skills-btn');
const moreSkillsList = document.getElementById('more-skills-list');
const skillImageContainer = document.getElementById('skill-image-container');
const skillImage = document.getElementById('skill-image');

let areMoreSkillsShown = false; // 追蹤更多技能是否顯示的狀態

if (skillsContainer && showMoreSkillsBtn && moreSkillsList && skillImageContainer && skillImage) {
    // **事件委派 for 技能懸停圖片顯示**
    // 將事件監聽器綁定到 .skills 容器上，而不是每個 li 元素
    skillsContainer.addEventListener('mouseover', (event) => {
        // 檢查事件來源是否為技能列表的 li 元素 (且不是「其他技能」按鈕)
        if (event.target.tagName === 'LI' && !event.target.classList.contains('show-more-btn')) {
            const item = event.target;
            const imageName = item.getAttribute('data-image');
            if (imageName) {
                skillImage.src = imageName;
                skillImageContainer.style.opacity = 1;
                skillImageContainer.style.transform = 'translateY(0)';
            } else {
                // 如果沒有 data-image，則隱藏圖片
                skillImageContainer.style.opacity = 0;
                skillImageContainer.style.transform = 'translateY(20px)';
                skillImage.src = '';
            }
        }
    });

    skillsContainer.addEventListener('mouseout', (event) => {
        // 檢查事件來源是否為技能列表的 li 元素 (且不是「其他技能」按鈕)
        if (event.target.tagName === 'LI' && !event.target.classList.contains('show-more-btn')) {
            // 只有當滑鼠真正離開技能 li 元素時才隱藏圖片
            skillImageContainer.style.opacity = 0;
            skillImageContainer.style.transform = 'translateY(20px)';
            skillImage.src = '';
        }
    });

    // 點擊「其他技能」按鈕
    showMoreSkillsBtn.addEventListener('click', () => {
        if (!areMoreSkillsShown) {
            moreSkillsList.classList.add('show');
            showMoreSkillsBtn.textContent = '隱藏技能 ▲';
            areMoreSkillsShown = true;
            // 點擊顯示更多技能後，隱藏當前顯示的圖片
            skillImageContainer.style.opacity = 0;
            skillImageContainer.style.transform = 'translateY(20px)';
            skillImage.src = '';
        } else {
            moreSkillsList.classList.remove('show');
            showMoreSkillsBtn.textContent = '其他技能 ▼';
            areMoreSkillsShown = false;
            // 隱藏圖片容器，以防點擊時圖片還顯示著
            skillImageContainer.style.opacity = 0;
            skillImageContainer.style.transform = 'translateY(20px)';
            skillImage.src = '';
        }
    });

    // 初始載入時，確保額外技能是隱藏的
    moreSkillsList.classList.remove('show');
}