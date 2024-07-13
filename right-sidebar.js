(function() {
    function generateOutline() {
        const content = document.querySelector('.markdown-section');
        if (!content) return;

        // 检查当前页面是否是 home.md
        const isHomePage = location.hash === '' || location.hash === '#/';
        if (isHomePage) {
            const sidebar = document.querySelector('.right-sidebar');
            if (sidebar) {
                sidebar.remove();  // 移除侧边栏
            }
            return;
        }

        const headers = content.querySelectorAll('h1, h2, h3, h4, h5, h6');
        if (!headers.length) return;

        const currentPath = location.hash.split('?')[0];

        let outline = '<div class="right-sidebar"><ul class="sidebar-nav">';

        let topLevelCount = 0;
        let secondLevelCount = 0;
        let thirdLevelCount = 0;
        let fourthLevelCount = 0;
        let fifthLevelCount = 0;
        let sixthLevelCount = 0;

        headers.forEach((header, index) => {
            const level = header.tagName[1];
            let text = header.textContent;
            const id = header.id;

            // Increase the count for the current level
            switch (level) {
                case '1':
                    topLevelCount++;
                    secondLevelCount = 0;
                    thirdLevelCount = 0;
                    fourthLevelCount = 0;
                    fifthLevelCount = 0;
                    sixthLevelCount = 0;
                    break;
                case '2':
                    secondLevelCount++;
                    thirdLevelCount = 0;
                    fourthLevelCount = 0;
                    fifthLevelCount = 0;
                    sixthLevelCount = 0;
                    break;
                case '3':
                    thirdLevelCount++;
                    fourthLevelCount = 0;
                    fifthLevelCount = 0;
                    sixthLevelCount = 0;
                    break;
                case '4':
                    fourthLevelCount++;
                    fifthLevelCount = 0;
                    sixthLevelCount = 0;
                    break;
                case '5':
                    fifthLevelCount++;
                    sixthLevelCount = 0;
                    break;
                case '6':
                    sixthLevelCount++;
                    break;
                default:
                    break;
            }

            // Generate the hierarchical number
            let number = '';
            if (level >= '2') number += `${topLevelCount}`;
            if (level >= '3') number += `.${secondLevelCount}`;
            if (level >= '4') number += `.${thirdLevelCount}`;
            if (level >= '5') number += `.${fourthLevelCount}`;
            if (level >= '6') number += `.${fifthLevelCount}`;
            if (level >= '7') number += `.${sixthLevelCount}`;

            if (index === 0) {
                text = '<span style="font-size: 24px; font-weight: bold; color: black;">大纲</span>';  // 第一个标题改为“大纲”，并设置样式
            }

            outline += `<li class="header-level-${level}"><a href="${currentPath}?id=${id}">${number} ${text}</a></li>`;
        });

        outline += '</ul></div>';

        const existingOutline = document.querySelector('.right-sidebar');
        if (existingOutline) {
            existingOutline.innerHTML = outline;
        } else {
            document.body.insertAdjacentHTML('beforeend', outline);
        }

        // Apply Docsify background color to sidebar
        const sidebarStyle = document.querySelector('.right-sidebar');
        if (sidebarStyle) {
            sidebarStyle.style.backgroundColor = 'white';  // 设置背景色为白色
        }
    }

    function init() {
        const style = document.createElement('style');
        style.innerHTML = `
            .right-sidebar {
                position: fixed;
                right: 0;
                top: 4.5vh;
                bottom: 0;
                width: 300px;
                max-height: 100vh;
                overflow-y: auto;
                padding: 20px;
                border-left: 1px solid #eee;
                z-index: 1;
                transition: transform 0.3s ease;
                background-color: white;
            }
            .right-sidebar ul {
                list-style: none;
                padding: 0;
                margin: 0;
            }
            .right-sidebar li {
                margin: 10px 0;
            }
            .right-sidebar .header-level-1 {
                font-size: 18px;
                font-weight: bold;
            }
            .right-sidebar .header-level-2 {
                font-size: 16px;
                padding-left: 10px;
            }
            .right-sidebar .header-level-3 {
                font-size: 14px;
                padding-left: 20px;
            }
            .right-sidebar .header-level-4 {
                font-size: 12px;
                padding-left: 30px;
            }
            .right-sidebar .header-level-5 {
                font-size: 10px;
                padding-left: 40px;
            }
            .right-sidebar .header-level-6 {
                font-size: 8px;
                padding-left: 50px;
            }
            .right-sidebar a {
                text-decoration: none;
                color: #42b983;
            }
            .right-sidebar a:hover {
                text-decoration: underline;
            }
            .toggle-sidebar {
                position: fixed;
                right: 0px;
                top: 85vh;
                z-index: 1100;
                background-color: #42b983;
                color: white;
                border: none;
                padding: 10px;
                cursor: pointer;
                box-shadow: 0 0 10px rgba(0,0,0,0.1);
            }
        `;
        document.head.appendChild(style);

        // Create toggle sidebar button
        const toggleButton = document.createElement('button');
        toggleButton.classList.add('toggle-sidebar');
        toggleButton.textContent = '大纲';
        document.body.appendChild(toggleButton);

        // Toggle sidebar visibility
        toggleButton.addEventListener('click', function() {
            const sidebar = document.querySelector('.right-sidebar');
            if (sidebar) {
                sidebar.style.transform = sidebar.style.transform ? '' : 'translateX(100%)';
            }
        });

        generateOutline();

        window.addEventListener('scroll', generateOutline);
        window.addEventListener('hashchange', generateOutline);
        window.addEventListener('DOMContentLoaded', generateOutline);
    }

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        init();
    } else {
        document.addEventListener('DOMContentLoaded', init);
    }
})();
