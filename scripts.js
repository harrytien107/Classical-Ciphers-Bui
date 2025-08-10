// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle Elements
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    
    // Language Elements
    const langEnBtn = document.getElementById('langEn');
    const langViBtn = document.getElementById('langVi');
    
    // Caesar Cipher Elements
    const caesarInput = document.getElementById('caesar-input');
    const caesarOutput = document.getElementById('caesar-output');
    const caesarShift = document.getElementById('caesar-shift');
    const caesarEncrypt = document.querySelectorAll('#caesar-encrypt');
    const caesarDecrypt = document.querySelectorAll('#caesar-decrypt');
    const tryCaesarExample = document.querySelectorAll('#try-caesar-example');
    const caesarTable = document.getElementById('caesar-table');
    const tableTypeRadios = document.querySelectorAll('input[name="tableType"]');
    
    // Word Lookup Elements
    const wordInput = document.getElementById('caesar-word-input');
    const wordEncryptBtns = document.querySelectorAll('.word-encrypt-btn');
    const wordDecryptBtns = document.querySelectorAll('.word-decrypt-btn');
    const wordOriginal = document.querySelectorAll('.caesar-word-original');
    const wordResult = document.querySelectorAll('.caesar-word-result');
    
    // Playfair Elements
    const playfairGrid = document.getElementById('playfair-grid');
    
    // Polybius Elements
    const polybiusSquare = document.getElementById('polybius-square');
    
    // Trithemius Elements
    const trithemiusTable = document.getElementById('trithemius-table');
    const trithemiusKeyType = document.getElementById('trithemius-key-type');
    const trithemiusKey = document.getElementById('trithemius-key');
    const trithemiusKeyContainer = document.getElementById('trithemius-key-container');
    const trithemiusKeySequence = document.getElementById('trithemius-key-sequence');
    
    // Cipher Disk Elements
    const diskInput = document.getElementById('disk-input');
    const diskOutput = document.getElementById('disk-output');
    const outerDiskChars = document.getElementById('outer-disk-chars');
    const innerDiskChars = document.getElementById('inner-disk-chars');
    const diskIndex = document.getElementById('disk-index');
    const diskKeyword = document.getElementById('disk-keyword');
    const loadFromKeywordBtns = document.querySelectorAll('#load-from-keyword');
    const resetDiskBtns = document.querySelectorAll('#reset-disk');
    const diskEncryptBtns = document.querySelectorAll('#disk-encrypt');
    const diskDecryptBtns = document.querySelectorAll('#disk-decrypt');
    const clearDiskBtns = document.querySelectorAll('#clear-disk');
    const copyDiskResultBtn = document.getElementById('copy-disk-result');
    const explainDiskBtn = document.getElementById('explain-disk-btn');
    const diskExplanationBtns = document.querySelectorAll('#disk-explanation-btn');
    const explanationModal = document.getElementById('explanation-modal');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    const modalCloseBtns = document.querySelectorAll('#modal-close-btn');
    const diskExplanationContent = document.getElementById('disk-explanation-content');
    const outerDisk = document.getElementById('outer-disk');
    const innerDisk = document.getElementById('inner-disk');
    const rotateLeftBtn = document.getElementById('rotate-left');
    const rotateRightBtn = document.getElementById('rotate-right');
    const tryDiskExampleBtns = document.querySelectorAll('#try-disk-example');

    // Visualization Elements
    const vizOuterChars = document.getElementById('viz-outer-chars');
    const vizInnerChars = document.getElementById('viz-inner-chars');
    const vizIndex = document.getElementById('viz-index');
    const vizSpeed = document.getElementById('viz-speed');
    const vizPlayBtns = document.querySelectorAll('#viz-play');
    const vizPauseBtns = document.querySelectorAll('#viz-pause');
    const vizOuterDisk = document.getElementById('viz-outer-disk');
    const vizInnerDisk = document.getElementById('viz-inner-disk');
    
    // Theme Initialization
    const getSystemTheme = () => {
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };
    
    const savedThemeMode = localStorage.getItem('themeMode') || 'system';
    const savedTheme = savedThemeMode === 'system' ? getSystemTheme() : savedThemeMode;
    
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Watch for system preference changes
    if (window.matchMedia) {
        const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
        colorSchemeQuery.addEventListener('change', (e) => {
            if (localStorage.getItem('themeMode') === 'system') {
                document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
                updateThemeIcon(e.matches ? 'dark' : 'light');
            }
        });
    }
    
    // Update theme icon based on current theme
    const updateThemeIcon = (theme) => {
        if (theme === 'dark') {
            themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
            themeToggleBtn.setAttribute('aria-label', 'Switch to system theme');
        } else if (theme === 'light') {
            themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
            themeToggleBtn.setAttribute('aria-label', 'Switch to dark mode');
        } else {
            // System theme icon
            themeToggleBtn.innerHTML = '<i class="fas fa-desktop"></i>';
            themeToggleBtn.setAttribute('aria-label', 'Switch to light mode');
        }
    };
    
    // Initialize the icon
    updateThemeIcon(savedThemeMode);
    
    // Theme Toggle - cycle through light, dark, system
    themeToggleBtn.addEventListener('click', () => {
        const currentMode = localStorage.getItem('themeMode') || 'system';
        let newMode;
        
        // Cycle through modes: light → dark → system
        if (currentMode === 'light') {
            newMode = 'dark';
        } else if (currentMode === 'dark') {
            newMode = 'system';
        } else {
            newMode = 'light';
        }
        
        // Apply the new theme
        localStorage.setItem('themeMode', newMode);
        
        // If system mode, get the actual theme from system preference
        const actualTheme = newMode === 'system' ? getSystemTheme() : newMode;
        document.documentElement.setAttribute('data-theme', actualTheme);
        
        // Update the icon and accessibility label
        updateThemeIcon(newMode);
    });
    
    // Set default language
    document.body.classList.add('lang-en');
    document.querySelector('nav').classList.add('lang-en');
    
    // Update placeholders based on language
    function updatePlaceholders(lang) {
        document.querySelectorAll('[data-placeholder-' + lang + ']').forEach(el => {
            el.placeholder = el.getAttribute('data-placeholder-' + lang);
        });
    }
    
    // Update document title based on language
    function updateDocumentTitle(lang) {
        const titleElements = document.querySelectorAll('title');
        titleElements.forEach(title => {
            if (title.getAttribute('data-lang') === lang) {
                document.title = title.textContent;
            }
        });
    }
    
    // Language toggle
    langEnBtn.addEventListener('click', function() {
        document.body.classList.remove('lang-vi');
        document.body.classList.add('lang-en');
        document.querySelector('nav').classList.remove('lang-vi');
        document.querySelector('nav').classList.add('lang-en');
        langEnBtn.classList.add('active');
        langViBtn.classList.remove('active');
        updatePlaceholders('en');
        updateDocumentTitle('en');
    });
    
    langViBtn.addEventListener('click', function() {
        document.body.classList.remove('lang-en');
        document.body.classList.add('lang-vi');
        document.querySelector('nav').classList.remove('lang-en');
        document.querySelector('nav').classList.add('lang-vi');
        langViBtn.classList.add('active');
        langEnBtn.classList.remove('active');
        updatePlaceholders('vi');
        updateDocumentTitle('vi');
    });
    
    // Initialize placeholders
    updatePlaceholders('en');
    updateDocumentTitle('en');
    
    // Navigation
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('.cipher-section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').replace('#', '');
            
            // Hide all sections
            sections.forEach(section => {
                section.style.display = 'none';
            });
            
            // Show target section
            document.getElementById(targetId).style.display = 'block';
            
            // Update active class
            navLinks.forEach(navLink => {
                navLink.classList.remove('active');
            });
            
            // Add active class to all links with the same href
            document.querySelectorAll(`nav a[href="#${targetId}"]`).forEach(navLink => {
                navLink.classList.add('active');
            });
        });
    });
    
    // Show the first section by default
    sections[0].style.display = 'block';
    
    // Initialize all ciphers
    initCaesarCipher();
    initPlayfairCipher();
    initPolybiusCipher();
    initTrithemiusCipher();
    initCipherDisk();
    initVigenereCipher();
    
    // Hiển thị các bảng mã
    displayCaesarTable();
    displayPolybiusSquare();
    displayTabulaRecta();
    
    // Hiển thị Playfair grid với từ khóa mặc định "CRYPTOGRAPHY"
    const defaultPlayfairGrid = createPlayfairGrid("CRYPTOGRAPHY");
    displayPlayfairGrid(defaultPlayfairGrid);
    createCipherDisk();

    // Initialize visualization (independent from interactive cipher disk)
    if (vizOuterDisk && vizInnerDisk) {
        let vizTimer = null;
        createVisualizationDisk();

        // Inputs sanitization
        if (vizOuterChars) vizOuterChars.addEventListener('input', () => {
            vizOuterChars.value = vizOuterChars.value.toUpperCase().replace(/[^A-Z0-9&+\-*/=@#$%^()\[\]{}|\\:;"'<>.,?!~`]/g, '');
            createVisualizationDisk();
        });
        if (vizInnerChars) vizInnerChars.addEventListener('input', () => {
            vizInnerChars.value = vizInnerChars.value.toUpperCase().replace(/[^A-Z0-9&+\-*/=@#$%^()\[\]{}|\\:;"'<>.,?!~`]/g, '');
            createVisualizationDisk();
        });
        if (vizIndex) vizIndex.addEventListener('input', () => {
            vizIndex.value = vizIndex.value.substring(0,1).toUpperCase().replace(/[^A-Z0-9&+\-*/=@#$%^()\[\]{}|\\:;"'<>.,?!~`]/g, '');
            if (vizIndex.value) alignVisualizationToChar(vizIndex.value);
        });

        // Play / Pause controls
        const startViz = () => {
            if (vizTimer) return;
            const step = () => {
                const chars = (vizInnerChars?.value || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ');
                const len = chars.length || 26;
                const current = getCurrentRotation(vizInnerDisk);
                const next = current + (360 / len);
                vizInnerDisk.style.transform = `rotate(${next}deg)`;
                // Update index display to the new top inner char
                const normalized = ((next % 360) + 360) % 360;
                const idx = Math.round(normalized / (360 / len)) % len;
                const ch = chars.charAt(idx);
                if (vizIndex) vizIndex.value = ch;
                highlightVisualization();
            };
            const interval = Math.max(100, Math.min(1500, parseInt(vizSpeed?.value || '600', 10)));
            vizTimer = setInterval(step, interval);
        };
        const stopViz = () => {
            if (vizTimer) { clearInterval(vizTimer); vizTimer = null; }
        };
        vizPlayBtns.forEach(btn => btn.addEventListener('click', startViz));
        vizPauseBtns.forEach(btn => btn.addEventListener('click', stopViz));
    }

    // ==== Caesar Cipher Implementation ====
    function initCaesarCipher() {
        // Generate Caesar table
        displayCaesarTable();
        
        // Event listeners for table type selector
        tableTypeRadios.forEach(radio => {
            radio.addEventListener('change', () => {
                displayCaesarTable();
                
                // Re-highlight if there's text in the input
                if (caesarInput.value) {
                    const shift = parseInt(caesarShift.value) || 3;
                    updateCaesarTableHighlights(caesarInput.value.toUpperCase(), shift, true);
                }
            });
        });
        
        // Update table when shift changes
        caesarShift.addEventListener('input', function() {
            displayCaesarTable();
            
            // Re-highlight if there's text in the input
            if (caesarInput.value) {
                const shift = parseInt(caesarShift.value) || 3;
                updateCaesarTableHighlights(caesarInput.value.toUpperCase(), shift, true);
            }
        });
        
        // Event listeners
        caesarEncrypt.forEach(btn => {
            btn.addEventListener('click', () => {
                const text = caesarInput.value.toUpperCase();
                const shift = parseInt(caesarShift.value);
                const result = caesarCipherEncrypt(text, shift);
                caesarOutput.value = result;
                
                // Generate and display explanation
                generateCaesarExplanation(text, result, shift, true);
                
                // Update the table to highlight used cells
                updateCaesarTableHighlights(text, shift, true);
            });
        });
        
        caesarDecrypt.forEach(btn => {
            btn.addEventListener('click', () => {
                const text = caesarInput.value.toUpperCase();
                const shift = parseInt(caesarShift.value);
                const result = caesarCipherDecrypt(text, shift);
                caesarOutput.value = result;
                
                // Generate and display explanation
                generateCaesarExplanation(text, result, shift, false);
                
                // Update the table to highlight used cells
                updateCaesarTableHighlights(text, shift, false);
            });
        });
        
        tryCaesarExample.forEach(btn => {
            btn.addEventListener('click', () => {
                caesarInput.value = 'VENI VIDI VICI';
                caesarShift.value = 3;
                caesarEncrypt[0].click();
                document.querySelector('#caesar').scrollIntoView({behavior: 'smooth'});
            });
        });
        
        // Word Lookup Event Listeners
        wordEncryptBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const word = wordInput.value.trim().toUpperCase();
                if (word) {
                    const shift = parseInt(caesarShift.value) || 0;
                    const encryptedWord = caesarCipherEncrypt(word, shift);
                    
                    // Update both EN and VI spans
                    wordOriginal.forEach(span => {
                        span.textContent = word;
                    });
                    wordResult.forEach(span => {
                        span.textContent = encryptedWord;
                    });
                    
                    // Update the table to highlight used cells for this word
                    updateCaesarTableHighlights(word, shift, true);
                }
            });
        });
        
        wordDecryptBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const word = wordInput.value.trim().toUpperCase();
                if (word) {
                    const shift = parseInt(caesarShift.value) || 0;
                    const decryptedWord = caesarCipherDecrypt(word, shift);
                    
                    // Update both EN and VI spans
                    wordOriginal.forEach(span => {
                        span.textContent = word;
                    });
                    wordResult.forEach(span => {
                        span.textContent = decryptedWord;
                    });
                    
                    // Update the table to highlight used cells for this word
                    updateCaesarTableHighlights(word, shift, false);
                }
            });
        });
    }
    
    function generateCaesarExplanation(input, output, shift, isEncrypt) {
        const explanationContent = document.getElementById('caesar-explanation-content');
        const explanationContainer = document.getElementById('caesar-explanation');
        let html = '';
        
        // Create language-specific explanation texts
        const isEnglish = document.body.classList.contains('lang-en');
        
        const title = isEnglish ? 
            (isEncrypt ? 'Caesar Cipher Encryption Process:' : 'Caesar Cipher Decryption Process:') :
            (isEncrypt ? 'Quá trình mã hóa Caesar:' : 'Quá trình giải mã Caesar:');
            
        const formulaText = isEnglish ?
            (isEncrypt ? 'For each letter, apply the formula: C = (P + shift) mod 26' : 'For each letter, apply the formula: P = (C - shift + 26) mod 26') :
            (isEncrypt ? 'Với mỗi chữ cái, áp dụng công thức: C = (P + độ dịch) mod 26' : 'Với mỗi chữ cái, áp dụng công thức: P = (C - độ dịch + 26) mod 26');
            
        const whereText = isEnglish ?
            (isEncrypt ? 'where P is the position of the plaintext letter (A=0, B=1, ..., Z=25) and C is the position of the ciphertext letter' : 'where C is the position of the ciphertext letter (A=0, B=1, ..., Z=25) and P is the position of the plaintext letter') :
            (isEncrypt ? 'trong đó P là vị trí của chữ cái gốc (A=0, B=1, ..., Z=25) và C là vị trí của chữ cái được mã hóa' : 'trong đó C là vị trí của chữ cái được mã hóa (A=0, B=1, ..., Z=25) và P là vị trí của chữ cái gốc');
        
        html += `<div class="step"><strong>${title}</strong></div>`;
        html += `<div class="step formula">${formulaText}</div>`;
        html += `<div class="step">${whereText}</div>`;
        
        // Show the shift value
        const shiftText = isEnglish ? `Using shift value: ${shift}` : `Sử dụng độ dịch: ${shift}`;
        html += `<div class="step"><strong>${shiftText}</strong></div>`;
        
        // Process each character in the input
        const cleanInput = input.toUpperCase().replace(/[^A-Z]/g, '');
        const cleanOutput = output.toUpperCase().replace(/[^A-Z]/g, '');
        
        for (let i = 0; i < Math.min(cleanInput.length, cleanOutput.length, 10); i++) {  // Limit to first 10 characters for readability
            const inputChar = cleanInput[i];
            const outputChar = cleanOutput[i];
            
            if (/[A-Z]/.test(inputChar)) {
                const inputPos = inputChar.charCodeAt(0) - 65;  // A=0, B=1, ...
                const outputPos = outputChar.charCodeAt(0) - 65;
                
                const calcText = isEnglish ?
                    (isEncrypt ? 
                        `${inputChar} (${inputPos}) → (${inputPos} + ${shift}) mod 26 = ${(inputPos + shift) % 26} → ${outputChar}` :
                        `${inputChar} (${inputPos}) → (${inputPos} - ${shift} + 26) mod 26 = ${(inputPos - shift + 26) % 26} → ${outputChar}`) :
                    (isEncrypt ? 
                        `${inputChar} (${inputPos}) → (${inputPos} + ${shift}) mod 26 = ${(inputPos + shift) % 26} → ${outputChar}` :
                        `${inputChar} (${inputPos}) → (${inputPos} - ${shift} + 26) mod 26 = ${(inputPos - shift + 26) % 26} → ${outputChar}`);
                
                html += `<div class="step"><span class="letter">${inputChar}</span> <span class="arrow">→</span> <span class="letter">${outputChar}</span>: ${calcText}</div>`;
            }
        }
        
        // Explanation for adding 26 in decryption
        if (!isEncrypt) {
            const addText = isEnglish ?
                'Note: We add 26 before taking modulo to ensure the result is positive even if (C-shift) is negative.' :
                'Lưu ý: Chúng ta cộng thêm 26 trước khi lấy modulo để đảm bảo kết quả luôn dương ngay cả khi (C-độ dịch) âm.';
            
            html += `<div class="step"><em>${addText}</em></div>`;
        }
        
        // Show the formula with a specific example
        if (cleanInput.length > 0 && /[A-Z]/.test(cleanInput[0])) {
            const exampleChar = cleanInput[0];
            const examplePos = exampleChar.charCodeAt(0) - 65;
            
            const exampleFormula = isEnglish ?
                (isEncrypt ? 
                    `Example: "${exampleChar}" → (${examplePos} + ${shift}) mod 26 = ${(examplePos + shift) % 26} → "${cleanOutput[0]}"` :
                    `Example: "${exampleChar}" → (${examplePos} - ${shift} + 26) mod 26 = ${(examplePos - shift + 26) % 26} → "${cleanOutput[0]}"`) :
                (isEncrypt ? 
                    `Ví dụ: "${exampleChar}" → (${examplePos} + ${shift}) mod 26 = ${(examplePos + shift) % 26} → "${cleanOutput[0]}"` :
                    `Ví dụ: "${exampleChar}" → (${examplePos} - ${shift} + 26) mod 26 = ${(examplePos - shift + 26) % 26} → "${cleanOutput[0]}"`);
                    
            html += `<div class="step formula"><strong>${exampleFormula}</strong></div>`;
        }
        
        explanationContent.innerHTML = html;
        explanationContainer.classList.add('has-content');
    }
    
    function caesarCipherEncrypt(text, shift) {
        // Process shift to ensure it's within 0-25
        shift = ((shift % 26) + 26) % 26;
        
        // Only encrypt letters, leave other characters as is
        return text.replace(/[A-Z]/g, char => {
            const code = char.charCodeAt(0);
            return String.fromCharCode(((code - 65 + shift) % 26) + 65);
        });
    }
    
    function caesarCipherDecrypt(text, shift) {
        // Decryption is just encryption with negative shift
        // Add 26 to handle negative shifts correctly
        return caesarCipherEncrypt(text, (26 - shift) % 26);
    }
    
    function displayCaesarTable() {
        const shift = parseInt(caesarShift.value) || 3;
        const tableType = document.querySelector('input[name="tableType"]:checked').value;
        
        // Create table
        let tableHTML = '<table class="caesar-cipher-table">';
        
        // Header row with alphabet
        tableHTML += '<tr><th></th>';
        for (let i = 0; i < 26; i++) {
            tableHTML += `<th>${String.fromCharCode(65 + i)}</th>`;
        }
        tableHTML += '</tr>';
        
        if (tableType === 'simple') {
            // Simple table with just 2 rows
            // Cipher row with shifted alphabet
            tableHTML += '<tr><th>Clear</th>';
            for (let i = 0; i < 26; i++) {
                tableHTML += `<td>${String.fromCharCode(65 + i)}</td>`;
            }
            tableHTML += '</tr>';
            
            tableHTML += '<tr><th>Cipher</th>';
            for (let i = 0; i < 26; i++) {
                tableHTML += `<td>${String.fromCharCode(65 + (i + shift) % 26)}</td>`;
            }
            tableHTML += '</tr>';
        } else {
            // Full table with 26 rows
            for (let i = 0; i < 26; i++) {
                const plainChar = String.fromCharCode(65 + i);
                tableHTML += `<tr data-row="${i}"><td>${plainChar}</td>`;
                
                for (let j = 0; j < 26; j++) {
                    const cipherChar = String.fromCharCode(65 + (i + j) % 26);
                    tableHTML += `<td>${cipherChar}</td>`;
                }
                
                tableHTML += '</tr>';
            }
        }
        
        tableHTML += '</table>';
        caesarTable.innerHTML = tableHTML;
    }
    
    // Function to highlight cells in the Caesar table
    function updateCaesarTableHighlights(text, shift, isEncrypt) {
        const tableType = document.querySelector('input[name="tableType"]:checked').value;
        
        // Clear existing highlights
        const allCells = document.querySelectorAll('.cipher-table td');
        allCells.forEach(cell => {
            cell.classList.remove('highlight');
        });
        
        // Process only alphabetic characters
        const alphabetOnly = text.replace(/[^A-Z]/g, '');
        
        if (tableType === 'simple') {
            // Highlight cells in the simple table
            for (let char of alphabetOnly) {
                if (/[A-Z]/.test(char)) {
                    const charIndex = char.charCodeAt(0) - 65; // A=0, B=1, etc.
                    let resultIndex;
                    
                    if (isEncrypt) {
                        resultIndex = (charIndex + shift) % 26;
                    } else {
                        resultIndex = (charIndex - shift + 26) % 26;
                    }
                    
                    // Highlight the corresponding cells in the simple table
                    const rows = document.querySelectorAll('.cipher-table tr');
                    if (rows.length >= 3) { // Header + 2 rows
                        // Highlight plain character in the first row
                        const plainCell = rows[1].querySelectorAll('td')[charIndex];
                        if (plainCell) plainCell.classList.add('highlight');
                        
                        // Highlight cipher character in the second row
                        const cipherCell = rows[2].querySelectorAll('td')[charIndex];
                        if (cipherCell) cipherCell.classList.add('highlight');
                    }
                }
            }
        } else {
            // Highlight cells in the full table
            for (let char of alphabetOnly) {
                if (/[A-Z]/.test(char)) {
                    const charIndex = char.charCodeAt(0) - 65; // A=0, B=1, etc.
                    let resultIndex;
                    
                    if (isEncrypt) {
                        resultIndex = (charIndex + shift) % 26;
                    } else {
                        resultIndex = (charIndex - shift + 26) % 26;
                    }
                    
                    // Find and highlight cells
                    const row = document.querySelector(`.cipher-table tr[data-row="${charIndex}"]`);
                    if (row) {
                        // Highlight the plaintext character
                        const plainCell = row.querySelector('td:first-child');
                        if (plainCell) plainCell.classList.add('highlight');
                        
                        // Highlight the shift column
                        const shiftColumnIndex = (shift % 26) + 1;
                        const shiftCell = row.querySelector(`td:nth-child(${shiftColumnIndex + 1})`);
                        if (shiftCell) shiftCell.classList.add('highlight');
                    }
                }
            }
        }
    }
    
    // ==== Playfair Cipher Implementation ====
    function initPlayfairCipher() {
        const playfairInput = document.getElementById('playfair-input');
        const playfairKeyword = document.getElementById('playfair-keyword');
        const playfairEncrypt = document.querySelectorAll('#playfair-encrypt');
        const playfairDecrypt = document.querySelectorAll('#playfair-decrypt');
        const playfairOutput = document.getElementById('playfair-output');
        const playfairGrid = document.getElementById('playfair-grid');
        const tryPlayfairExample = document.querySelectorAll('#try-playfair-example');
        const playfairDigraphProcessing = document.getElementById('playfair-digraph-processing');
        
        // Event listener for keyword input to update grid in real-time
        playfairKeyword.addEventListener('input', () => {
            const keyword = playfairKeyword.value.toUpperCase();
            const grid = createPlayfairGrid(keyword);
            displayPlayfairGrid(grid);
            
            // If there's text in the input field, show digraph processing
            if (playfairInput.value.trim()) {
                displayDigraphProcessing(playfairInput.value.toUpperCase(), grid);
            }
        });
        
        // Event listener for text input to update digraph processing
        playfairInput.addEventListener('input', () => {
            if (playfairInput.value.trim()) {
                const keyword = playfairKeyword.value.toUpperCase();
                const grid = createPlayfairGrid(keyword);
                displayDigraphProcessing(playfairInput.value.toUpperCase(), grid);
            } else {
                playfairDigraphProcessing.innerHTML = '';
            }
        });
        
        playfairEncrypt.forEach(btn => {
            btn.addEventListener('click', () => {
                const text = playfairInput.value.toUpperCase().replace(/J/g, 'I');
                const keyword = playfairKeyword.value.toUpperCase();
                
                const grid = createPlayfairGrid(keyword);
                displayPlayfairGrid(grid);
                
                const result = playfairCipherEncrypt(text, grid);
                playfairOutput.value = result;
                
                // Generate explanation
                generatePlayfairExplanation(text, result, grid, true);
                
                // Display digraph processing
                displayDigraphProcessing(text, grid, true);
            });
        });
        
        playfairDecrypt.forEach(btn => {
            btn.addEventListener('click', () => {
                const text = playfairInput.value.toUpperCase();
                const keyword = playfairKeyword.value.toUpperCase();
                
                const grid = createPlayfairGrid(keyword);
                displayPlayfairGrid(grid);
                
                const result = playfairCipherDecrypt(text, grid);
                playfairOutput.value = result;
                
                // Generate explanation
                generatePlayfairExplanation(text, result, grid, false);
                
                // Display digraph processing
                displayDigraphProcessing(text, grid, false);
            });
        });
        
        tryPlayfairExample.forEach(btn => {
            btn.addEventListener('click', () => {
                playfairInput.value = 'CRYPTOGRAPHY';
                playfairKeyword.value = 'LEONARD';
                playfairEncrypt[0].click();
                document.querySelector('#playfair').scrollIntoView({behavior: 'smooth'});
            });
        });
        
        // Show empty grid initially
        displayPlayfairGrid(createPlayfairGrid(''));
    }
    
    function generatePlayfairExplanation(input, output, grid, isEncrypt) {
        const explanationContent = document.getElementById('playfair-explanation-content');
        const explanationContainer = document.getElementById('playfair-explanation');
        let html = '';
        
        // Create language-specific explanation texts
        const isEnglish = document.body.classList.contains('lang-en');
        
        const title = isEnglish ? 
            (isEncrypt ? 'Playfair Cipher Encryption Process:' : 'Playfair Cipher Decryption Process:') :
            (isEncrypt ? 'Quá trình mã hóa Playfair:' : 'Quá trình giải mã Playfair:');
            
        html += `<div class="step"><strong>${title}</strong></div>`;
        
        // Prepare input text (remove spaces, replace J with I)
        const cleanText = input.replace(/[^A-Z]/g, '').replace(/J/g, 'I');
        html += `<div class="step">${isEnglish ? 'Step 1: Prepare the text (remove spaces, replace J with I)' : 'Bước 1: Chuẩn bị văn bản (loại bỏ khoảng trắng, thay thế J bằng I)'}</div>`;
        html += `<div class="step">${isEnglish ? 'Input:' : 'Đầu vào:'} <span class="letter">${input}</span> → <span class="letter">${cleanText}</span></div>`;
        
        // Generate digraphs
        html += `<div class="step">${isEnglish ? 'Step 2: Split into digraphs (pairs of letters)' : 'Bước 2: Chia thành các cặp chữ cái'}</div>`;
        
        // Recreate the digraphs for explanation
        const digraphs = [];
        const processedText = cleanText;
        
        for (let i = 0; i < processedText.length; i += 2) {
            if (i + 1 < processedText.length) {
                // If pair has same letters, insert X or Q between
                if (processedText[i] === processedText[i + 1]) {
                    digraphs.push(processedText[i] + (processedText[i] === 'X' ? 'Q' : 'X'));
                    i--; // Process the second character again
                } else {
                    digraphs.push(processedText[i] + processedText[i + 1]);
                }
            } else {
                // If text has odd length, add X to the last character
                digraphs.push(processedText[i] + 'X');
            }
        }
        
        html += `<div class="step">${isEnglish ? 'Digraphs:' : 'Các cặp chữ:'} `;
        digraphs.forEach(digraph => {
            html += `<span class="letter">${digraph}</span> `;
        });
        html += `</div>`;
        
        // Explain the encryption/decryption rule for each digraph
        html += `<div class="step">${isEnglish ? 'Step 3: Apply Playfair rules to each digraph' : 'Bước 3: Áp dụng quy tắc Playfair cho từng cặp chữ'}</div>`;
        
        // Get the output digraphs
        const outputDigraphs = output.split(' ');
        
        for (let i = 0; i < digraphs.length; i++) {
            const digraph = digraphs[i];
            const outputDigraph = outputDigraphs[i] || '';
            
            // Find positions in grid
            const pos1 = findPositionInGrid(digraph[0], grid);
            const pos2 = findPositionInGrid(digraph[1], grid);
            
            let rule, explanation;
            
            // Determine which rule applies
            if (pos1.row === pos2.row) {
                if (isEncrypt) {
                    rule = isEnglish ? 'Same row rule: Take letters to the right' : 'Quy tắc cùng hàng: Lấy chữ cái bên phải';
                    explanation = isEnglish ? 
                        `Letters are in same row (${pos1.row}). Moving right: ${digraph[0]}(${pos1.row},${pos1.col}) → ${outputDigraph[0]}(${pos1.row},(${pos1.col}+1)%5), ${digraph[1]}(${pos2.row},${pos2.col}) → ${outputDigraph[1]}(${pos2.row},(${pos2.col}+1)%5)` :
                        `Các chữ cái nằm cùng hàng (${pos1.row}). Di chuyển sang phải: ${digraph[0]}(${pos1.row},${pos1.col}) → ${outputDigraph[0]}(${pos1.row},(${pos1.col}+1)%5), ${digraph[1]}(${pos2.row},${pos2.col}) → ${outputDigraph[1]}(${pos2.row},(${pos2.col}+1)%5)`;
                } else {
                    rule = isEnglish ? 'Same row rule: Take letters to the left' : 'Quy tắc cùng hàng: Lấy chữ cái bên trái';
                    explanation = isEnglish ?
                        `Letters are in same row (${pos1.row}). Moving left: ${digraph[0]}(${pos1.row},${pos1.col}) → ${outputDigraph[0]}(${pos1.row},(${pos1.col}+4)%5), ${digraph[1]}(${pos2.row},${pos2.col}) → ${outputDigraph[1]}(${pos2.row},(${pos2.col}+4)%5)` :
                        `Các chữ cái nằm cùng hàng (${pos1.row}). Di chuyển sang trái: ${digraph[0]}(${pos1.row},${pos1.col}) → ${outputDigraph[0]}(${pos1.row},(${pos1.col}+4)%5), ${digraph[1]}(${pos2.row},${pos2.col}) → ${outputDigraph[1]}(${pos2.row},(${pos2.col}+4)%5)`;
                }
            } else if (pos1.col === pos2.col) {
                if (isEncrypt) {
                    rule = isEnglish ? 'Same column rule: Take letters below' : 'Quy tắc cùng cột: Lấy chữ cái bên dưới';
                    explanation = isEnglish ?
                        `Letters are in same column (${pos1.col}). Moving down: ${digraph[0]}(${pos1.row},${pos1.col}) → ${outputDigraph[0]}((${pos1.row}+1)%5,${pos1.col}), ${digraph[1]}(${pos2.row},${pos2.col}) → ${outputDigraph[1]}((${pos2.row}+1)%5,${pos2.col})` :
                        `Các chữ cái nằm cùng cột (${pos1.col}). Di chuyển xuống dưới: ${digraph[0]}(${pos1.row},${pos1.col}) → ${outputDigraph[0]}((${pos1.row}+1)%5,${pos1.col}), ${digraph[1]}(${pos2.row},${pos2.col}) → ${outputDigraph[1]}((${pos2.row}+1)%5,${pos2.col})`;
                } else {
                    rule = isEnglish ? 'Same column rule: Take letters above' : 'Quy tắc cùng cột: Lấy chữ cái bên trên';
                    explanation = isEnglish ?
                        `Letters are in same column (${pos1.col}). Moving up: ${digraph[0]}(${pos1.row},${pos1.col}) → ${outputDigraph[0]}((${pos1.row}+4)%5,${pos1.col}), ${digraph[1]}(${pos2.row},${pos2.col}) → ${outputDigraph[1]}((${pos2.row}+4)%5,${pos2.col})` :
                        `Các chữ cái nằm cùng cột (${pos1.col}). Di chuyển lên trên: ${digraph[0]}(${pos1.row},${pos1.col}) → ${outputDigraph[0]}((${pos1.row}+4)%5,${pos1.col}), ${digraph[1]}(${pos2.row},${pos2.col}) → ${outputDigraph[1]}((${pos2.row}+4)%5,${pos2.col})`;
                }
            } else {
                rule = isEnglish ? 'Rectangle rule: Take letters at corners' : 'Quy tắc hình chữ nhật: Lấy chữ cái ở các góc';
                explanation = isEnglish ?
                    `Letters form a rectangle. Swapping columns: ${digraph[0]}(${pos1.row},${pos1.col}) → ${outputDigraph[0]}(${pos1.row},${pos2.col}), ${digraph[1]}(${pos2.row},${pos2.col}) → ${outputDigraph[1]}(${pos2.row},${pos1.col})` :
                    `Các chữ cái tạo thành hình chữ nhật. Hoán đổi cột: ${digraph[0]}(${pos1.row},${pos1.col}) → ${outputDigraph[0]}(${pos1.row},${pos2.col}), ${digraph[1]}(${pos2.row},${pos2.col}) → ${outputDigraph[1]}(${pos2.row},${pos1.col})`;
            }
            
            html += `<div class="step">
                <span class="letter">${digraph}</span> 
                <span class="arrow">→</span> 
                <span class="letter">${outputDigraph}</span>: 
                ${rule}<br>
                ${explanation}
            </div>`;
        }
        
        // Put it all together
        html += `<div class="step">${isEnglish ? 'Step 4: Final result (with spaces added for readability)' : 'Bước 4: Kết quả cuối cùng (thêm khoảng trắng để dễ đọc)'}</div>`;
        html += `<div class="step"><span class="letter">${output}</span></div>`;
        
        explanationContent.innerHTML = html;
        explanationContainer.classList.add('has-content');
    }
    
    function createPlayfairGrid(keyword) {
        // Remove duplicate letters and J from keyword
        keyword = keyword.replace(/J/g, 'I').split('')
            .filter((char, index, self) => self.indexOf(char) === index).join('');
        
        // Create the alphabet excluding J
        const alphabet = 'ABCDEFGHIKLMNOPQRSTUVWXYZ'; // no J
        
        // Combine keyword and remaining letters
        let remainingLetters = alphabet;
        for (let i = 0; i < keyword.length; i++) {
            remainingLetters = remainingLetters.replace(keyword[i], '');
        }
        
        const gridString = keyword + remainingLetters;
        
        // Create 5x5 grid
        const grid = [];
        for (let i = 0; i < 5; i++) {
            grid[i] = [];
            for (let j = 0; j < 5; j++) {
                grid[i][j] = gridString[i * 5 + j];
            }
        }
        
        return grid;
    }
    
    function displayPlayfairGrid(grid) {
        playfairGrid.innerHTML = '';
        
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.textContent = grid[i][j] || '';
                playfairGrid.appendChild(cell);
            }
        }
    }
    
    function findPositionInGrid(char, grid) {
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                if (grid[i][j] === char) {
                    return { row: i, col: j };
                }
            }
        }
        return null;
    }
    
    function playfairCipherEncrypt(text, grid) {
        // Prepare the text
        text = text.replace(/[^A-Z]/g, '').replace(/J/g, 'I');
        
        // Split into digraphs (pairs of letters)
        const digraphs = [];
        for (let i = 0; i < text.length; i += 2) {
            if (i + 1 < text.length) {
                // If pair has same letters, insert X or Q between
                if (text[i] === text[i + 1]) {
                    digraphs.push(text[i] + (text[i] === 'X' ? 'Q' : 'X'));
                    i--;  // Process the second character again
                } else {
                    digraphs.push(text[i] + text[i + 1]);
                }
            } else {
                // If text has odd length, add X to the last character
                digraphs.push(text[i] + 'X');
            }
        }
        
        // Encrypt each digraph
        const encryptedDigraphs = digraphs.map(digraph => {
            const pos1 = findPositionInGrid(digraph[0], grid);
            const pos2 = findPositionInGrid(digraph[1], grid);
            
            // Same row - take letters to the right
            if (pos1.row === pos2.row) {
                return grid[pos1.row][(pos1.col + 1) % 5] + grid[pos2.row][(pos2.col + 1) % 5];
            }
            // Same column - take letters below
            else if (pos1.col === pos2.col) {
                return grid[(pos1.row + 1) % 5][pos1.col] + grid[(pos2.row + 1) % 5][pos2.col];
            }
            // Rectangle - take letters at opposite corners on same row
            else {
                return grid[pos1.row][pos2.col] + grid[pos2.row][pos1.col];
            }
        });
        
        // Group result for readability
        return encryptedDigraphs.join(' ');
    }
    
    function playfairCipherDecrypt(text, grid) {
        // Remove spaces and prepare text
        text = text.replace(/\s/g, '').replace(/J/g, 'I');
        
        // Split into digraphs
        const digraphs = [];
        for (let i = 0; i < text.length; i += 2) {
            if (i + 1 < text.length) {
                digraphs.push(text[i] + text[i + 1]);
            } else {
                digraphs.push(text[i] + 'X');
            }
        }
        
        // Decrypt each digraph
        const decryptedDigraphs = digraphs.map(digraph => {
            const pos1 = findPositionInGrid(digraph[0], grid);
            const pos2 = findPositionInGrid(digraph[1], grid);
            
            // Same row - take letters to the left
            if (pos1.row === pos2.row) {
                return grid[pos1.row][(pos1.col + 4) % 5] + grid[pos2.row][(pos2.col + 4) % 5];
            }
            // Same column - take letters above
            else if (pos1.col === pos2.col) {
                return grid[(pos1.row + 4) % 5][pos1.col] + grid[(pos2.row + 4) % 5][pos2.col];
            }
            // Rectangle - take letters at opposite corners on same row
            else {
                return grid[pos1.row][pos2.col] + grid[pos2.row][pos1.col];
            }
        });
        
        // Join result and replace padding X's at the end
        return decryptedDigraphs.join('');
    }
    
    // ==== Polybius Cipher Implementation ====
    function initPolybiusCipher() {
        const polybiusInput = document.getElementById('polybius-input');
        const polybiusMode = document.getElementById('polybius-mode');
        const polybiusEncrypt = document.querySelectorAll('#polybius-encrypt');
        const polybiusDecrypt = document.querySelectorAll('#polybius-decrypt');
        const polybiusOutput = document.getElementById('polybius-output');
        const polybiusSquare = document.getElementById('polybius-square');
        const tryPolybiusExample = document.querySelectorAll('#try-polybius-example');
        const polybiusCoordInput = document.getElementById('polybius-coord-input');
        const polybiusFindCoord = document.querySelectorAll('#polybius-find-coord');
        const polybiusCoordResult = document.getElementById('polybius-coord-result');
        
        // Display Polybius square
        displayPolybiusSquare();
        
        polybiusEncrypt.forEach(btn => {
            btn.addEventListener('click', () => {
                const text = polybiusInput.value.toUpperCase();
                const result = polybiusCipherEncrypt(text);
                polybiusOutput.value = result;
                
                // Generate explanation
                generatePolybiusExplanation(text, result, true);
            });
        });
        
        polybiusDecrypt.forEach(btn => {
            btn.addEventListener('click', () => {
                const text = polybiusInput.value.toUpperCase().replace(/[^1-5]/g, '');
                const result = polybiusCipherDecrypt(text);
                polybiusOutput.value = result;
                
                // Generate explanation
                generatePolybiusExplanation(text, result, false);
            });
        });
        
        tryPolybiusExample.forEach(btn => {
            btn.addEventListener('click', () => {
                polybiusInput.value = 'DANG HOANG VIET';
                polybiusEncrypt[0].click();
                document.querySelector('#polybius').scrollIntoView({behavior: 'smooth'});
            });
        });
        
        // Coordinate helper functionality
        polybiusCoordInput.addEventListener('input', function() {
            // Convert to uppercase
            this.value = this.value.toUpperCase();
            // Only allow A-Z
            if (this.value && !/^[A-Z]$/.test(this.value)) {
                this.value = this.value.replace(/[^A-Z]/g, '');
            }
        });
        
        polybiusFindCoord.forEach(btn => {
            btn.addEventListener('click', () => {
                const letter = polybiusCoordInput.value.toUpperCase();
                
                if (!letter) {
                    const isEnglish = document.body.classList.contains('lang-en');
                    polybiusCoordResult.innerHTML = isEnglish ? 
                        'Please enter a letter (A-Z).' : 
                        'Vui lòng nhập một chữ cái (A-Z).';
                    return;
                }
                
                findPolybiusCoordinate(letter);
            });
        });
        
        // Allow pressing Enter in the coordinate input
        polybiusCoordInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                polybiusFindCoord[0].click();
            }
        });
    }
    
    function generatePolybiusExplanation(input, output, isEncrypt) {
        const explanationContent = document.getElementById('polybius-explanation-content');
        const explanationContainer = document.getElementById('polybius-explanation');
        let html = '';
        
        // Create language-specific explanation texts
        const isEnglish = document.body.classList.contains('lang-en');
        
        const title = isEnglish ? 
            (isEncrypt ? 'Polybius Cipher Encryption Process:' : 'Polybius Cipher Decryption Process:') :
            (isEncrypt ? 'Quá trình mã hóa Polybius:' : 'Quá trình giải mã Polybius:');
            
        html += `<div class="step"><strong>${title}</strong></div>`;
        
        if (isEncrypt) {
            // Encryption explanation
            html += `<div class="step">${isEnglish ? 'Step 1: For each letter, find its coordinates in the Polybius square' : 'Bước 1: Với mỗi chữ cái, tìm tọa độ của nó trong hình vuông Polybius'}</div>`;
            
            // Process each character
            for (let i = 0; i < input.length; i++) {
                const char = input[i];
                const code = char.charCodeAt(0);
                
                // Skip non-alphabetic characters
                if (code < 65 || code > 90) {
                    html += `<div class="step">${isEnglish ? 'Character' : 'Ký tự'} <span class="letter">${char}</span> ${isEnglish ? 'is not a letter, keeps unchanged' : 'không phải là chữ cái, giữ nguyên'}</div>`;
                    continue;
                }
                
                // Convert J to I for the explanation
                const processChar = char === 'J' ? 'I' : char;
                
                // Calculate coordinates
                let position = processChar.charCodeAt(0) - 65;
                if (processChar.charCodeAt(0) > 74) position--; // Adjust for J
                
                const row = Math.floor(position / 5) + 1;
                const col = (position % 5) + 1;
                
                // The output coordinate for this character would be row+col
                const coordOutput = `${row}${col}`;
                
                html += `<div class="step">
                    <span class="letter">${char}</span> 
                    <span class="arrow">→</span> 
                    ${isEnglish ? 'Row' : 'Hàng'} ${row}, ${isEnglish ? 'Column' : 'Cột'} ${col}
                    <span class="arrow">→</span> 
                    <span class="letter">${coordOutput}</span>
                </div>`;
            }
        } else {
            // Decryption explanation
            html += `<div class="step">${isEnglish ? 'Step 1: Process pairs of digits as coordinates in the Polybius square' : 'Bước 1: Xử lý các cặp số như tọa độ trong hình vuông Polybius'}</div>`;
            
            // Clean input (remove non-numeric characters)
            const cleanText = input.replace(/[^0-9]/g, '');
            html += `<div class="step">${isEnglish ? 'Clean input (keep only digits):' : 'Đầu vào sau khi làm sạch (chỉ giữ lại số):'} <span class="letter">${cleanText}</span></div>`;
            
            // Process pairs of digits
            for (let i = 0; i < cleanText.length; i += 2) {
                if (i + 1 < cleanText.length) {
                    const row = parseInt(cleanText[i]);
                    const col = parseInt(cleanText[i + 1]);
                    
                    if (row >= 1 && row <= 5 && col >= 1 && col <= 5) {
                        // Calculate letter
                        let position = (row - 1) * 5 + col - 1;
                        let charCode = position + 65;
                        
                        // Adjust for I/J combined position
                        if (position >= 9) charCode++;
                        
                        let outputChar;
                        // Handle I/J
                        if (row === 2 && col === 4) {
                            outputChar = '(I/J)';
                        } else {
                            outputChar = String.fromCharCode(charCode);
                        }
                        
                        html += `<div class="step">
                            <span class="letter">${row}${col}</span> 
                            <span class="arrow">→</span> 
                            ${isEnglish ? 'Row' : 'Hàng'} ${row}, ${isEnglish ? 'Column' : 'Cột'} ${col}
                            <span class="arrow">→</span> 
                            <span class="letter">${outputChar}</span>
                        </div>`;
                    } else {
                        html += `<div class="step">
                            <span class="letter">${row}${col}</span> 
                            <span class="arrow">→</span> 
                            ${isEnglish ? 'Invalid coordinates, skipped' : 'Tọa độ không hợp lệ, bỏ qua'}
                        </div>`;
                    }
                }
            }
        }
        
        html += `<div class="step">${isEnglish ? 'Final result:' : 'Kết quả cuối cùng:'} <span class="letter">${output}</span></div>`;
        
        explanationContent.innerHTML = html;
        explanationContainer.classList.add('has-content');
    }
    
    // Restore the displayPolybiusSquare function
    function displayPolybiusSquare() {
        polybiusSquare.innerHTML = '';
        
        // Add headers
        const headerRow = document.createElement('div');
        headerRow.className = 'polybius-row';
        
        // Empty corner cell
        const cornerCell = document.createElement('div');
        cornerCell.className = 'cell header';
        cornerCell.textContent = '';
        polybiusSquare.appendChild(cornerCell);
        
        // Column headers (1-5)
        for (let i = 1; i <= 5; i++) {
            const cell = document.createElement('div');
            cell.className = 'cell header';
            cell.textContent = i;
            polybiusSquare.appendChild(cell);
        }
        
        // Create the grid with row headers and letters
        for (let i = 1; i <= 5; i++) {
            // Row header
            const rowHeader = document.createElement('div');
            rowHeader.className = 'cell header';
            rowHeader.textContent = i;
            polybiusSquare.appendChild(rowHeader);
            
            // Letters
            for (let j = 1; j <= 5; j++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                
                // Calculate the letter (A=65)
                let charCode = 64 + (i - 1) * 5 + j;
                
                // Skip J (74) and use I instead
                if (charCode >= 74) charCode++;
                
                // Handle I/J
                if (charCode === 73) {
                    cell.textContent = 'I/J';
                } else {
                    cell.textContent = String.fromCharCode(charCode);
                }
                
                polybiusSquare.appendChild(cell);
            }
        }
    }
    
    function polybiusCipherEncrypt(text) {
        return text.split('').map(char => {
            const upperChar = char.toUpperCase();
            const code = upperChar.charCodeAt(0);
            
            // Check if it's a letter
            if (code >= 65 && code <= 90) {
                // Convert J to I
                if (upperChar === 'J') return '24';
                
                // Calculate coordinates
                let position = code - 65;
                if (code > 74) position--;  // Adjust for J
                
                const row = Math.floor(position / 5) + 1;
                const col = (position % 5) + 1;
                
                return `${row}${col}`;
            }
            // Return non-alphabetic characters unchanged
            return char;
        }).join(' ');
    }
    
    function polybiusCipherDecrypt(text) {
        // Remove spaces and prepare text
        const cleanText = text.replace(/[^0-9]/g, '');
        
        let result = '';
        
        // Process pairs of numbers
        for (let i = 0; i < cleanText.length; i += 2) {
            if (i + 1 < cleanText.length) {
                const row = parseInt(cleanText[i]);
                const col = parseInt(cleanText[i + 1]);
                
                // Check if valid coordinates
                if (row >= 1 && row <= 5 && col >= 1 && col <= 5) {
                    // Calculate letter
                    let position = (row - 1) * 5 + col - 1;
                    let charCode = position + 65;
                    
                    // Adjust for I/J combined position
                    if (position >= 9) charCode++;
                    
                    // Handle I/J
                    if (row === 2 && col === 4) {
                        result += '(I/J)';
                    } else {
                        result += String.fromCharCode(charCode);
                    }
                }
            }
        }
        
        return result;
    }
    
    function findPolybiusCoordinate(letter) {
        const polybiusCoordResult = document.getElementById('polybius-coord-result');
        const isEnglish = document.body.classList.contains('lang-en');
        
        if (!letter || !/^[A-Z]$/.test(letter)) {
            polybiusCoordResult.innerHTML = isEnglish ? 
                'Please enter a valid letter (A-Z).' : 
                'Vui lòng nhập một chữ cái hợp lệ (A-Z).';
            return;
        }
        
        // Handle J specially (mapped to I in Polybius)
        const processedLetter = letter === 'J' ? 'I' : letter;
        
        // Calculate position in the 5x5 grid
        let position = processedLetter.charCodeAt(0) - 65; // A = 0, B = 1, etc.
        
        // Adjust for missing J in the Polybius square (J is mapped to I)
        if (processedLetter.charCodeAt(0) > 74) { // J is 74, so K and beyond need adjustment
            position--;
        }
        
        const row = Math.floor(position / 5) + 1;
        const col = (position % 5) + 1;
        
        let resultHTML = '';
        
        if (letter === 'J') {
            resultHTML = isEnglish ?
                `Letter <span class="letter-coord">J</span> is represented as <span class="letter-coord">I</span> in the Polybius square. Coordinates: <span class="grid-position">${row}${col}</span>` :
                `Chữ cái <span class="letter-coord">J</span> được biểu diễn là <span class="letter-coord">I</span> trong hình vuông Polybius. Tọa độ: <span class="grid-position">${row}${col}</span>`;
        } else {
            resultHTML = isEnglish ?
                `Coordinates for <span class="letter-coord">${letter}</span>: <span class="grid-position">${row}${col}</span>` :
                `Tọa độ cho <span class="letter-coord">${letter}</span>: <span class="grid-position">${row}${col}</span>`;
        }
        
        polybiusCoordResult.innerHTML = resultHTML;
        
        // Add highlight class for animation effect
        polybiusCoordResult.classList.add('highlight');
        
        // Highlight the corresponding cell in the Polybius square
        highlightPolybiusCell(row, col);
        
        // Remove highlight class after animation completes
        setTimeout(() => {
            polybiusCoordResult.classList.remove('highlight');
        }, 1000);
    }
    
    function highlightPolybiusCell(row, col) {
        // Remove any existing highlights
        const cells = document.querySelectorAll('.polybius-square .cell');
        cells.forEach(cell => cell.classList.remove('highlight'));
        
        // Find and highlight the target cell
        const targetCell = document.querySelector(`.polybius-square .cell[data-row="${row}"][data-col="${col}"]`);
        if (targetCell) {
            targetCell.classList.add('highlight');
            
            // Remove highlight after 2 seconds
            setTimeout(() => {
                targetCell.classList.remove('highlight');
            }, 2000);
        }
    }
    
    // ==== Trithemius Cipher Implementation ====
    function initTrithemiusCipher() {
        const trithemiusInput = document.getElementById('trithemius-input');
        const trithemiusKeyType = document.getElementById('trithemius-key-type');
        const trithemiusKeyContainer = document.getElementById('trithemius-key-container');
        const trithemiusKey = document.getElementById('trithemius-key');
        const trithemiusEncrypt = document.querySelectorAll('#trithemius-encrypt');
        const trithemiusDecrypt = document.querySelectorAll('#trithemius-decrypt');
        const trithemiusOutput = document.getElementById('trithemius-output');
        const trithemiusTable = document.getElementById('trithemius-table');
        const trithemiusKeySequence = document.getElementById('trithemius-key-sequence');
        const tryTrithemiusExample = document.querySelectorAll('#try-trithemius-example');
        
        // Display Tabula Recta
        displayTabulaRecta();
        
        // Toggle key input visibility based on selected key type
        trithemiusKeyType.addEventListener('change', function() {
            if (this.value === 'custom') {
                trithemiusKeyContainer.classList.add('show');
            } else {
                trithemiusKeyContainer.classList.remove('show');
            }
            
            // Update key sequence preview for sample text
            const sampleText = 'ABCDEFGH';
            const keySequence = generateKeySequence(sampleText, this.value, trithemiusKey.value);
            displayKeySequence(keySequence);
        });
        
        // Update key sequence when custom key is changed
        trithemiusKey.addEventListener('input', function() {
            if (trithemiusKeyType.value === 'custom') {
                const sampleText = 'ABCDEFGH';
                const keySequence = generateKeySequence(sampleText, 'custom', this.value);
                displayKeySequence(keySequence);
            }
        });
        
        // Initial display of key sequence
        const sampleText = 'ABCDEFGH';
        const keySequence = generateKeySequence(sampleText, 'progressive', '');
        displayKeySequence(keySequence);
        
        trithemiusEncrypt.forEach(btn => {
            btn.addEventListener('click', () => {
                const text = trithemiusInput.value.toUpperCase().replace(/[^A-Z]/g, '');
                const keyType = trithemiusKeyType.value;
                const customKey = keyType === 'custom' ? trithemiusKey.value.toUpperCase().replace(/[^A-Z0-9]/g, '') : '';
                
                // Generate the actual key sequence based on the key type
                const keySequence = generateKeySequence(text, keyType, customKey);
                
                // Display the key sequence
                displayKeySequence(keySequence);
                
                // Encrypt using the generated key sequence
                const result = trithemiusCipherEncryptWithSequence(text, keySequence);
                trithemiusOutput.value = result;
                
                // Generate explanation
                generateTrithemiusExplanation(text, result, keyType, customKey, keySequence, true);
            });
        });
        
        trithemiusDecrypt.forEach(btn => {
            btn.addEventListener('click', () => {
                const text = trithemiusInput.value.toUpperCase().replace(/[^A-Z]/g, '');
                const keyType = trithemiusKeyType.value;
                const customKey = keyType === 'custom' ? trithemiusKey.value.toUpperCase().replace(/[^A-Z0-9]/g, '') : '';
                
                // Generate the actual key sequence based on the key type
                const keySequence = generateKeySequence(text, keyType, customKey);
                
                // Display the key sequence
                displayKeySequence(keySequence);
                
                // Decrypt using the generated key sequence
                const result = trithemiusCipherDecryptWithSequence(text, keySequence);
                trithemiusOutput.value = result;
                
                // Generate explanation
                generateTrithemiusExplanation(text, result, keyType, customKey, keySequence, false);
            });
        });
        
        tryTrithemiusExample.forEach(btn => {
            btn.addEventListener('click', () => {
                trithemiusInput.value = 'ALL YOU WILL PASS THE EXAM';
                trithemiusKeyType.value = 'custom';
                trithemiusKeyType.dispatchEvent(new Event('change'));
                trithemiusKey.value = 'KM21';
                trithemiusEncrypt[0].click();
                document.querySelector('#trithemius').scrollIntoView({behavior: 'smooth'});
            });
        });
    }
    
    // Function to generate key sequence based on key type and text length
    function generateKeySequence(text, keyType, customKey) {
        const keySequence = [];
        
        switch (keyType) {
            case 'progressive':
                // Standard Trithemius progression (0, 1, 2, 3, ...)
                for (let i = 0; i < text.length; i++) {
                    keySequence.push(i % 26);
                }
                break;
                
            case 'squared':
                // Squared progression (0, 1, 4, 9, 16, ...)
                for (let i = 0; i < text.length; i++) {
                    keySequence.push((i * i) % 26);
                }
                break;
                
            case 'custom':
                if (!customKey) {
                    // Fallback to progressive if no key is provided
                    for (let i = 0; i < text.length; i++) {
                        keySequence.push(i % 26);
                    }
                } else if (/^\d+$/.test(customKey)) {
                    // If key is purely numeric, use those numbers directly
                    const numbers = customKey.split('').map(Number);
                    for (let i = 0; i < text.length; i++) {
                        keySequence.push(numbers[i % numbers.length]);
                    }
                } else {
                    // Otherwise, convert letters to numbers (A=0, B=1, ...)
                    for (let i = 0; i < text.length; i++) {
                        const keyChar = customKey[i % customKey.length];
                        const keyCode = /[A-Z]/.test(keyChar) ? keyChar.charCodeAt(0) - 65 : parseInt(keyChar) % 26;
                        keySequence.push(keyCode);
                    }
                }
                break;
        }
        
        return keySequence;
    }
    
    // Function to display the key sequence
    function displayKeySequence(keySequence) {
        const keySequenceContainer = document.getElementById('trithemius-key-sequence');
        if (!keySequenceContainer) return;
        let html = '';
        keySequence.forEach(k => {
            html += `<span class="key-item">${k}</span>`;
        });
        keySequenceContainer.innerHTML = html;
    }
    
    function generateTrithemiusExplanation(input, output, keyType, customKey, keySequence, isEncrypt) {
        const explanationContent = document.getElementById('trithemius-explanation-content');
        const explanationContainer = document.getElementById('trithemius-explanation');
        let html = '';
        
        // Create language-specific explanation texts
        const isEnglish = document.body.classList.contains('lang-en');
        
        // Determine method description based on key type
        let method;
        switch (keyType) {
            case 'progressive':
                method = isEnglish ? 'Using progressive shift (standard Trithemius method)' : 
                                   'Sử dụng độ dịch tăng dần (phương pháp Trithemius tiêu chuẩn)';
                break;
            case 'squared':
                method = isEnglish ? 'Using squared progression shift' : 
                                   'Sử dụng độ dịch tiến triển bình phương';
                break;
            case 'custom':
                method = isEnglish ? `Using custom key "${customKey}"` : 
                                   `Sử dụng khóa tùy chỉnh "${customKey}"`;
                break;
        }
        
        const title = isEnglish ? 
            (isEncrypt ? `Trithemius Cipher Encryption Process (${method}):` : `Trithemius Cipher Decryption Process (${method}):`) :
            (isEncrypt ? `Quá trình mã hóa Trithemius (${method}):` : `Quá trình giải mã Trithemius (${method}):`);
            
        html += `<div class="step"><strong>${title}</strong></div>`;
        
        // Clean the text
        const cleanText = input.replace(/[^A-Z]/g, '');
        html += `<div class="step">${isEnglish ? 'Step 1: Clean the input (remove non-alphabetic characters)' : 'Bước 1: Làm sạch đầu vào (loại bỏ ký tự không phải chữ cái)'}</div>`;
        html += `<div class="step">${isEnglish ? 'Cleaned input:' : 'Đầu vào sau khi làm sạch:'} <span class="letter">${cleanText}</span></div>`;
        
        // Step 2: Explain key sequence generation
        html += `<div class="step">${isEnglish ? 'Step 2: Generate key sequence' : 'Bước 2: Tạo dãy khóa'}</div>`;
        
        // Explanation of key sequence generation depends on the key type
        switch (keyType) {
            case 'progressive':
                html += `<div class="step">${isEnglish ? 'Progressive key sequence: Index values (0, 1, 2, ...)' : 'Dãy khóa tiến triển: Giá trị chỉ mục (0, 1, 2, ...)'}</div>`;
                break;
                
            case 'squared':
                html += `<div class="step">${isEnglish ? 'Squared key sequence: Index values squared (0, 1, 4, 9, ...)' : 'Dãy khóa bình phương: Giá trị chỉ mục bình phương (0, 1, 4, 9, ...)'}</div>`;
                break;
                
            case 'custom':
                if (/^\d+$/.test(customKey)) {
                    html += `<div class="step">${isEnglish ? `Numeric key: Each digit used directly from "${customKey}"` : `Khóa số: Mỗi chữ số được sử dụng trực tiếp từ "${customKey}"`}</div>`;
                } else {
                    html += `<div class="step">${isEnglish ? `Custom key: Letters converted to numbers (A=0, B=1, ...) from "${customKey}"` : `Khóa tùy chỉnh: Chữ cái chuyển đổi thành số (A=0, B=1, ...) từ "${customKey}"`}</div>`;
                }
                break;
        }
        
        // Show part of the key sequence
        html += `<div class="step">${isEnglish ? 'Key sequence: ' : 'Dãy khóa: '}`;
        for (let i = 0; i < Math.min(cleanText.length, 8); i++) {
            html += `<span class="letter">${keySequence[i]}</span> `;
        }
        if (cleanText.length > 8) {
            html += `... (${cleanText.length - 8} ${isEnglish ? 'more' : 'nữa'})`;
        }
        html += `</div>`;
        
        // Step 3: Apply the cipher
        html += `<div class="step">${isEnglish ? 'Step 3: Apply the cipher to each letter' : 'Bước 3: Áp dụng mã hóa cho từng chữ cái'}</div>`;
        
        // Process each character
        for (let i = 0; i < Math.min(cleanText.length, 8); i++) {
            const char = cleanText[i];
            const code = char.charCodeAt(0) - 65; // A=0, B=1, ...
            const shift = keySequence[i];
            const outputChar = output[i] || '';
            
            if (isEncrypt) {
                // For encryption
                const newCode = (code + shift) % 26;
                html += `<div class="step">
                    <span class="letter">${char}</span> (${code}) + 
                    Key[${i}] = ${shift}
                    <span class="arrow">→</span> 
                    (${code} + ${shift}) mod 26 = ${newCode} 
                    <span class="arrow">→</span> 
                    <span class="letter">${outputChar}</span>
                </div>`;
            } else {
                // For decryption
                const newCode = (code - shift + 26) % 26;
                html += `<div class="step">
                    <span class="letter">${char}</span> (${code}) - 
                    Key[${i}] = ${shift}
                    <span class="arrow">→</span> 
                    (${code} - ${shift} + 26) mod 26 = ${newCode} 
                    <span class="arrow">→</span> 
                    <span class="letter">${outputChar}</span>
                </div>`;
            }
        }
        
        if (cleanText.length > 8) {
            html += `<div class="step">${isEnglish ? 'Process continues for all remaining letters...' : 'Quá trình tiếp tục cho tất cả các chữ cái còn lại...'}</div>`;
        }
        
        explanationContent.innerHTML = html;
        explanationContainer.classList.add('has-content');
    }
    
    function displayTabulaRecta() {
        const trithemiusTable = document.getElementById('trithemius-table');
        trithemiusTable.innerHTML = '';
        
        // Add empty cell in top left corner
        const cornerCell = document.createElement('div');
        cornerCell.className = 'cell header';
        cornerCell.textContent = '';
        trithemiusTable.appendChild(cornerCell);
        
        // Column headers (A-Z)
        for (let i = 0; i < 26; i++) {
            const cell = document.createElement('div');
            cell.className = 'cell header';
            cell.textContent = String.fromCharCode(65 + i);
            trithemiusTable.appendChild(cell);
        }
        
        // Rows
        for (let i = 0; i < 26; i++) {
            // Row header (A-Z)
            const rowHeader = document.createElement('div');
            rowHeader.className = 'cell header index';
            rowHeader.textContent = String.fromCharCode(65 + i);
            trithemiusTable.appendChild(rowHeader);
            
            // Table cells
            for (let j = 0; j < 26; j++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                
                // Calculate the shifted letter
                const letter = (i + j) % 26;
                cell.textContent = String.fromCharCode(65 + letter);
                
                trithemiusTable.appendChild(cell);
            }
        }
    }
    
    // Modified encryption function that uses the key sequence directly
    function trithemiusCipherEncryptWithSequence(text, keySequence) {
        let result = '';
        
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            const code = char.charCodeAt(0) - 65;  // A=0, B=1, ...
            
            if (code >= 0 && code <= 25) {
                // Apply the key from the sequence
                const shift = keySequence[i % keySequence.length];
                const newCode = (code + shift) % 26;
                result += String.fromCharCode(newCode + 65);
            } else {
                // Keep non-alphabetic characters
                result += char;
            }
        }
        
        return result;
    }
    
    // Modified decryption function that uses the key sequence directly
    function trithemiusCipherDecryptWithSequence(text, keySequence) {
        let result = '';
        
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            const code = char.charCodeAt(0) - 65;  // A=0, B=1, ...
            
            if (code >= 0 && code <= 25) {
                // Apply the inverse key from the sequence
                const shift = keySequence[i % keySequence.length];
                const newCode = (code - shift + 26) % 26;  // Add 26 to handle negative results
                result += String.fromCharCode(newCode + 65);
            } else {
                // Keep non-alphabetic characters
                result += char;
            }
        }
        
        return result;
    }
    
    // Original functions kept for backwards compatibility
    function trithemiusCipherEncrypt(text, key) {
        if (!key) {
            // Standard Trithemius method (progressive shift)
            let result = '';
            for (let i = 0; i < text.length; i++) {
                const char = text.charAt(i);
                const code = char.charCodeAt(0);
                
                if (code >= 65 && code <= 90) {
                    // Apply the shift (position in text)
                    const newCode = ((code - 65) + i) % 26 + 65;
                    result += String.fromCharCode(newCode);
                } else {
                    result += char;
                }
            }
            return result;
        } else {
            // Using a keyword for shift
            let result = '';
            for (let i = 0; i < text.length; i++) {
                const char = text.charAt(i);
                const code = char.charCodeAt(0);
                
                if (code >= 65 && code <= 90) {
                    // Get the key character
                    const keyChar = key[i % key.length];
                    let keyCode;
                    
                    if (/[A-Z]/.test(keyChar)) {
                        // If key character is a letter
                        keyCode = keyChar.charCodeAt(0) - 65;
                    } else {
                        // If key character is a digit
                        keyCode = parseInt(keyChar) % 26;
                    }
                    
                    // Apply the shift from the key
                    const newCode = ((code - 65) + keyCode) % 26 + 65;
                    result += String.fromCharCode(newCode);
                } else {
                    result += char;
                }
            }
            return result;
        }
    }
    
    function trithemiusCipherDecrypt(text, key) {
        if (!key) {
            // Standard Trithemius method (progressive shift)
            let result = '';
            for (let i = 0; i < text.length; i++) {
                const char = text.charAt(i);
                const code = char.charCodeAt(0);
                
                if (code >= 65 && code <= 90) {
                    // Apply the shift (position in text) in reverse
                    const newCode = ((code - 65) - i + 26 * 100) % 26 + 65;  // Add a large multiple of 26 to avoid negative numbers
                    result += String.fromCharCode(newCode);
                } else {
                    result += char;
                }
            }
            return result;
        } else {
            // Using a keyword for shift
            let result = '';
            for (let i = 0; i < text.length; i++) {
                const char = text.charAt(i);
                const code = char.charCodeAt(0);
                
                if (code >= 65 && code <= 90) {
                    // Get the key character
                    const keyChar = key[i % key.length];
                    let keyCode;
                    
                    if (/[A-Z]/.test(keyChar)) {
                        // If key character is a letter
                        keyCode = keyChar.charCodeAt(0) - 65;
                    } else {
                        // If key character is a digit
                        keyCode = parseInt(keyChar) % 26;
                    }
                    
                    // Apply the shift from the key in reverse
                    const newCode = ((code - 65) - keyCode + 26 * 100) % 26 + 65;  // Add a large multiple of 26 to avoid negative numbers
                    result += String.fromCharCode(newCode);
                } else {
                    result += char;
                }
            }
            return result;
        }
    }

    function displayDigraphProcessing(text, grid, isEncrypt = true) {
        const digraphProcessing = document.getElementById('playfair-digraph-processing');
        const isEnglish = document.body.classList.contains('lang-en');
        digraphProcessing.innerHTML = '';

        const processedText = text.replace(/[^A-Z]/g, '').replace(/J/g, 'I');
        if (!processedText) return;

        // Prepare digraphs just like in encryption/decryption function
        const digraphs = [];
        let i = 0;
        while (i < processedText.length) {
            // Check if we need to add another character
            if (i === processedText.length - 1) {
                digraphs.push(processedText[i] + 'X');
                break;
            }
            
            // Check if letters are the same
            if (processedText[i] === processedText[i + 1]) {
                const separator = processedText[i] === 'X' ? 'Q' : 'X';
                digraphs.push(processedText[i] + separator);
                i++; // Only advance by one since we inserted a letter
            } else {
                digraphs.push(processedText[i] + processedText[i + 1]);
                i += 2;
            }
        }

        let html = '';
        digraphs.forEach((digraph, index) => {
            const first = digraph[0];
            const second = digraph[1];
            const pos1 = findPositionInGrid(first, grid);
            const pos2 = findPositionInGrid(second, grid);
            
            let resultDigraph = '';
            let ruleApplied = '';
            
            if (pos1.row === pos2.row) {
                // Same row rule
                const newCol1 = (pos1.col + (isEncrypt ? 1 : 4)) % 5;
                const newCol2 = (pos2.col + (isEncrypt ? 1 : 4)) % 5;
                resultDigraph = grid[pos1.row][newCol1] + grid[pos2.row][newCol2];
                ruleApplied = isEnglish ? 'Same row rule: Take letters to the right (or wrap around)' : 
                                         'Quy tắc cùng hàng: Lấy chữ cái bên phải (hoặc quay vòng)';
            } else if (pos1.col === pos2.col) {
                // Same column rule
                const newRow1 = (pos1.row + (isEncrypt ? 1 : 4)) % 5;
                const newRow2 = (pos2.row + (isEncrypt ? 1 : 4)) % 5;
                resultDigraph = grid[newRow1][pos1.col] + grid[newRow2][pos2.col];
                ruleApplied = isEnglish ? 'Same column rule: Take letters below (or wrap around)' : 
                                         'Quy tắc cùng cột: Lấy chữ cái bên dưới (hoặc quay vòng)';
            } else {
                // Rectangle rule
                resultDigraph = grid[pos1.row][pos2.col] + grid[pos2.row][pos1.col];
                ruleApplied = isEnglish ? 'Rectangle rule: Take letters at corners of the rectangle' : 
                                         'Quy tắc hình chữ nhật: Lấy chữ cái ở góc của hình chữ nhật';
            }
            
            html += `<div class="digraph-item">`;
            html += `<div>${isEnglish ? 'Digraph' : 'Cặp ký tự'} ${index + 1}: <span class="digraph-pair">${first}${second}</span>`;
            html += ` [${first}: (${pos1.row},${pos1.col}), ${second}: (${pos2.row},${pos2.col})]</div>`;
            html += `<div class="digraph-rule">${ruleApplied}</div>`;
            html += `<div class="digraph-result">${isEncrypt ? 'Result' : 'Kết quả'}: <span class="digraph-pair">${resultDigraph}</span></div>`;
            html += `</div>`;
        });
        
        digraphProcessing.innerHTML = html;
    }

    // ==== Cipher Disk Implementation ====
    function initCipherDisk() {
        // Initialize the disk
        createCipherDisk();
        
        // Event listeners for disk character inputs
        outerDiskChars.addEventListener('input', () => {
            // Allow A-Z, 0-9, and common symbols like &, +, -, *, /, =, etc.
            outerDiskChars.value = outerDiskChars.value.toUpperCase().replace(/[^A-Z0-9&+\-*/=@#$%^()\[\]{}|\\:;"'<>,.?!~`]/g, '');
            // Re-create cipher disk
            createCipherDisk();
        });
        
        innerDiskChars.addEventListener('input', () => {
            // Allow A-Z, 0-9, and common symbols like &, +, -, *, /, =, etc.
            innerDiskChars.value = innerDiskChars.value.toUpperCase().replace(/[^A-Z0-9&+\-*/=@#$%^()\[\]{}|\\:;"'<>,.?!~`]/g, '');
            // Re-create cipher disk
            createCipherDisk();
        });
        
        // Index (match character) change
        diskIndex.addEventListener('input', () => {
            // Convert to uppercase and limit to one character (allow letters, numbers, symbols)
            diskIndex.value = diskIndex.value.substring(0, 1).toUpperCase().replace(/[^A-Z0-9&+\-*/=@#$%^()\[\]{}|\\:;"'<>,.?!~`]/g, '');
            
            if (diskIndex.value) {
                alignDiskToCharacter(diskIndex.value);
            }
        });
        
        // Keyword event listeners
        diskKeyword.addEventListener('input', () => {
            // Convert to uppercase
            diskKeyword.value = diskKeyword.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
        });
        
        // Load from keyword
        loadFromKeywordBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const keyword = diskKeyword.value;
                if (keyword) {
                    // Set the first character of keyword as the index character
                    const firstChar = keyword.charAt(0).toUpperCase();
                    diskIndex.value = firstChar;
                    alignDiskToCharacter(firstChar);

                    // Visual feedback
                    btn.classList.add('active');
                    setTimeout(() => btn.classList.remove('active'), 1000);
                }
            });
        });
        
        // Reset disk
        resetDiskBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                outerDiskChars.value = 'AWCDEUGILMNOPQRSTVXY12KH';
                innerDiskChars.value = 'DLGAZENBOSFCHTYQIXKVP&MR';
                diskIndex.value = 'A';
                diskKeyword.value = '';
                rotateInnerDisk(0); // Reset inner disk rotation
                rotateOuterDisk(0); // Reset outer disk rotation
                createCipherDisk();
            });
        });
        
        // Clear all inputs and outputs
        clearDiskBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                diskInput.value = '';
                diskOutput.value = '';
                diskKeyword.value = '';
                diskExplanationContent.innerHTML = '';
            });
        });

        // Copy result to clipboard
        copyDiskResultBtn.addEventListener('click', () => {
            if (diskOutput.value) {
                navigator.clipboard.writeText(diskOutput.value)
                    .then(() => {
                        // Show copied notification
                        const originalTitle = copyDiskResultBtn.getAttribute('title');
                        copyDiskResultBtn.setAttribute('title', 'Copied!');
                        copyDiskResultBtn.innerHTML = '<i class="fas fa-check"></i>';
                        
                        setTimeout(() => {
                            copyDiskResultBtn.setAttribute('title', originalTitle);
                            copyDiskResultBtn.innerHTML = '<i class="fas fa-copy"></i>';
                        }, 2000);
                    })
                    .catch(err => {
                        console.error('Could not copy text: ', err);
                    });
            }
        });
        
        // Handle the explain disk button (top right corner of result)
        explainDiskBtn.addEventListener('click', () => {
            // If explanation content exists, show it
            if (diskOutput.value) {
                const input = diskInput.value.toUpperCase();
                const keywordValue = diskKeyword.value || 'A';
                const outerChars = outerDiskChars.value;
                const innerChars = innerDiskChars.value;
                const indexChar = diskIndex.value || 'A';
                
                // Determine if we did encryption or decryption based on last operation
                const isEncrypt = diskOutput.getAttribute('data-last-operation') === 'encrypt';
                
                generateCipherDiskExplanationAdvanced(input, diskOutput.value, keywordValue, outerChars, innerChars, indexChar, isEncrypt);
                openExplanationModal();
            }
        });
        
        // Modal handling for explanation
        // Show modal when explanation button is clicked
        diskExplanationBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                if (diskExplanationContent.innerHTML) {
                    openExplanationModal();
                } else {
                    // If no explanation available yet, generate one using current settings
                    const input = diskInput.value;
                    const output = diskOutput.value;
                    if (input && output) {
                        const keywordValue = diskKeyword.value || 'A';
                        const outerChars = outerDiskChars.value;
                        const innerChars = innerDiskChars.value;
                        const indexChar = diskIndex.value || 'A';
                        
                        // Determine if we did encryption or decryption based on button order
                        const isEncrypt = diskOutput.getAttribute('data-last-operation') === 'encrypt';
                        
                        generateCipherDiskExplanationAdvanced(input, output, keywordValue, outerChars, innerChars, indexChar, isEncrypt);
                        openExplanationModal();
                    }
                }
            });
        });
        
        // Close modal events
        closeModalBtns.forEach(btn => {
            btn.addEventListener('click', closeExplanationModal);
        });
        
        modalCloseBtns.forEach(btn => {
            btn.addEventListener('click', closeExplanationModal);
        });
        
        // Close modal when clicking outside
        window.addEventListener('click', (event) => {
            if (event.target === explanationModal) {
                closeExplanationModal();
            }
        });

        // Encrypt/Decrypt button listeners
        diskEncryptBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const input = diskInput.value.toUpperCase();
                const keywordValue = diskKeyword.value || 'A';
                const outerChars = outerDiskChars.value;
                const innerChars = innerDiskChars.value;
                const indexChar = diskIndex.value || 'A';
                
                const result = cipherDiskEncryptAdvanced(input, keywordValue, outerChars, innerChars, indexChar);
                diskOutput.value = result;
                
                // Mark as an encryption operation
                diskOutput.setAttribute('data-last-operation', 'encrypt');
                
                // Generate explanation but don't show it yet
                generateCipherDiskExplanationAdvanced(input, result, keywordValue, outerChars, innerChars, indexChar, true);
            });
        });

        diskDecryptBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const input = diskInput.value.toUpperCase();
                const keywordValue = diskKeyword.value || 'A';
                const outerChars = outerDiskChars.value;
                const innerChars = innerDiskChars.value;
                const indexChar = diskIndex.value || 'A';
                
                const result = cipherDiskDecryptAdvanced(input, keywordValue, outerChars, innerChars, indexChar);
                diskOutput.value = result;
                
                // Mark as a decryption operation
                diskOutput.setAttribute('data-last-operation', 'decrypt');
                
                // Generate explanation but don't show it yet
                generateCipherDiskExplanationAdvanced(input, result, keywordValue, outerChars, innerChars, indexChar, false);
            });
        });

        // Try example button listener
        tryDiskExampleBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                diskInput.value = "MEET ME AT MIDNIGHT";
                diskKeyword.value = "KEY";
                diskIndex.value = "K"; // K from keyword aligns with A on outer
                
                // Align inner disk so 'K' is at 12 o'clock position
                alignDiskToCharacter('K');
                
                // Encrypt the example
                diskEncryptBtns[0].click();

                // Smooth scroll to output area so user sees result
                document.querySelector('#cipher-disk').scrollIntoView({behavior: 'smooth'});
            });
        });

        // Disk rotation event listeners
        rotateLeftBtn.addEventListener('click', () => {
            const mode = document.querySelector('input[name="rotationMode"]:checked').value;
            const outerChars = outerDiskChars.value;
            if (mode === 'inner') {
                const currentRotation = getCurrentRotation(innerDisk);
                rotateInnerDisk(currentRotation - (360/outerChars.length));
                updateIndexFromRotation();
            } else {
                const currentRotation = getCurrentRotation(outerDisk);
                rotateOuterDisk(currentRotation - (360/outerChars.length));
                updateIndexFromOuterRotation();
            }
            // refresh orange highlights
            highlightCurrentLetters();
        });

        rotateRightBtn.addEventListener('click', () => {
            const mode = document.querySelector('input[name="rotationMode"]:checked').value;
            const outerChars = outerDiskChars.value;
            if (mode === 'inner') {
                const currentRotation = getCurrentRotation(innerDisk);
                rotateInnerDisk(currentRotation + (360/outerChars.length));
                updateIndexFromRotation();
            } else {
                const currentRotation = getCurrentRotation(outerDisk);
                rotateOuterDisk(currentRotation + (360/outerChars.length));
                updateIndexFromOuterRotation();
            }
            // refresh orange highlights
            highlightCurrentLetters();
        });
    }
    
    // Modal functions
    function openExplanationModal() {
        explanationModal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling behind modal
    }
    
    function closeExplanationModal() {
        explanationModal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    }

    function createCipherDisk() {
        // Clear existing disks
        outerDisk.innerHTML = '';
        innerDisk.innerHTML = '';
        
        // Get character sets
        const outerChars = outerDiskChars.value || 'AWCDEUGILMNOPQRSTVXY12KH';
        const innerChars = innerDiskChars.value || 'DLGAZENBOSFCHTYQIXKVP&MR';
        
        // radial dividers for outer ring
        const outerSegments = outerChars.length;
        for(let i=0;i<outerSegments;i++){
            const div = document.createElement('div');
            div.className = 'ring-divider';
            div.style.transform = `rotate(${(360/outerSegments)*i}deg)`;
            outerDisk.appendChild(div);
        }
        // Create outer disk letters
        for (let i = 0; i < outerChars.length; i++) {
            const letter = document.createElement('div');
            letter.className = 'disk-letter outer-letter';
            letter.textContent = outerChars[i];
            
            // Calculate position on circle
            const angle = (i * (360 / outerChars.length)) * (Math.PI / 180);
            const radius = 150 - 25; // push letters inside ring
            const x = radius * Math.sin(angle);
            const y = -radius * Math.cos(angle);
            
            letter.style.transform = `translate(${x}px, ${y}px)`;
            outerDisk.appendChild(letter);
        }
        
        // radial dividers for inner ring
        const innerSegments = innerChars.length;
        for(let i=0;i<innerSegments;i++){
            const div = document.createElement('div');
            div.className = 'inner-divider';
            div.style.transform = `rotate(${(360/innerSegments)*i}deg)`;
            innerDisk.appendChild(div);
        }
        // Create inner disk letters
        for (let i = 0; i < innerChars.length; i++) {
            const letter = document.createElement('div');
            letter.className = 'disk-letter inner-letter';
            letter.textContent = innerChars[i];
            
            // Calculate position on circle
            const angle = (i * (360 / innerChars.length)) * (Math.PI / 180);
            const radius = 110 - 25;
            const x = radius * Math.sin(angle);
            const y = -radius * Math.cos(angle);
            
            letter.style.transform = `translate(${x}px, ${y}px)`;
            innerDisk.appendChild(letter);
        }
        
        // Set initial alignment
        const indexChar = diskIndex.value || 'A';
        alignDiskToCharacter(indexChar);
        
        // Keep current rotations as set by alignDiskToCharacter; do not reset here
        // initial highlight like the screenshot (top inner + chosen index char)
        highlightCurrentLetters();
    }

    // Visualization: build disks (read-only)
    function createVisualizationDisk() {
        // Clear
        vizOuterDisk.innerHTML = '';
        vizInnerDisk.innerHTML = '';
        // Inputs
        const outerChars = (vizOuterChars?.value || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ').toUpperCase();
        const innerChars = (vizInnerChars?.value || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ').toUpperCase();
        // Dividers
        for(let i=0;i<outerChars.length;i++){
            const d = document.createElement('div');
            d.className = 'ring-divider';
            d.style.transform = `rotate(${(360/outerChars.length)*i}deg)`;
            vizOuterDisk.appendChild(d);
        }
        for(let i=0;i<innerChars.length;i++){
            const d = document.createElement('div');
            d.className = 'inner-divider';
            d.style.transform = `rotate(${(360/innerChars.length)*i}deg)`;
            vizInnerDisk.appendChild(d);
        }
        // Letters outer
        for(let i=0;i<outerChars.length;i++){
            const el=document.createElement('div');
            el.className='disk-letter outer-letter';
            el.textContent=outerChars[i];
            const angle=i*(360/outerChars.length)*Math.PI/180;
            const r=150-25; const x=r*Math.sin(angle); const y=-r*Math.cos(angle);
            el.style.transform=`translate(${x}px, ${y}px)`;
            vizOuterDisk.appendChild(el);
        }
        // Letters inner
        for(let i=0;i<innerChars.length;i++){
            const el=document.createElement('div');
            el.className='disk-letter inner-letter';
            el.textContent=innerChars[i];
            const angle=i*(360/innerChars.length)*Math.PI/180;
            const r=110-25; const x=r*Math.sin(angle); const y=-r*Math.cos(angle);
            el.style.transform=`translate(${x}px, ${y}px)`;
            vizInnerDisk.appendChild(el);
        }
        // Initial align
        alignVisualizationToChar(vizIndex?.value || 'A');
    }

    function alignDiskToCharacter(char) {
        // Standard cipher disk: rotate INNER so that the specified inner character aligns with outer 'A' at 12 o'clock
        const innerChars = innerDiskChars.value;
        const innerPosition = innerChars.indexOf(char);
        if (innerPosition !== -1) {
            // Rotate inner disk so that the specified character is at the top (12 o'clock)
            // Since letters are positioned starting from 12 o'clock and going clockwise,
            // we need to rotate by the character's position * step size
            const degrees = innerPosition * (360 / innerChars.length);
            rotateInnerDisk(degrees);
            
            // Update the index input to reflect current alignment
            diskIndex.value = char;
            highlightCurrentLetters();
        }
    }

    function rotateInnerDisk(degrees) {
        // Normalize degrees to be within 0-359
        degrees = ((degrees % 360) + 360) % 360;
        innerDisk.style.transform = `rotate(${degrees}deg)`;
    }

    function rotateOuterDisk(degrees) {
        // Normalize degrees to be within 0-359
        degrees = ((degrees % 360) + 360) % 360;
        outerDisk.style.transform = `rotate(${degrees}deg)`;
    }

    // Visualization helpers
    function alignVisualizationToChar(char){
        const chars = (vizInnerChars?.value || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ');
        const pos = chars.indexOf((char||'A').toUpperCase());
        if(pos>=0){ vizInnerDisk.style.transform = `rotate(${pos*(360/chars.length)}deg)`; }
        highlightVisualization();
    }
    function highlightVisualization(){
        document.querySelectorAll('#viz-outer-disk .disk-letter, #viz-inner-disk .disk-letter')
            .forEach(el=>el.classList.remove('is-accent'));
        // outer A
        const outerLetters = Array.from(vizOuterDisk.querySelectorAll('.outer-letter'));
        const aEl = outerLetters.find(el=>el.textContent==='A');
        if(aEl) aEl.classList.add('is-accent');
        // inner index
        const innerLetters = Array.from(vizInnerDisk.querySelectorAll('.inner-letter'));
        const idxChar = (vizIndex?.value || 'A').toUpperCase();
        const iEl = innerLetters.find(el=>el.textContent===idxChar);
        if(iEl) iEl.classList.add('is-accent');
    }

    function highlightCurrentLetters() {
        // Clear previous highlights
        document.querySelectorAll('.disk-letter').forEach(el => {
            el.classList.remove('is-accent','index-letter','key-letter','highlight');
        });

        const outerChars = outerDiskChars.value || '';
        const innerChars = innerDiskChars.value || '';
        const indexChar = diskIndex.value || 'A';

        // Always highlight the letter 'A' on outer disk (fixed reference point)
        if (outerChars.includes('A')) {
            const outerLetters = Array.from(outerDisk.querySelectorAll('.outer-letter'));
            const outerEl = outerLetters.find(el => el.textContent.toUpperCase() === 'A');
            if (outerEl) outerEl.classList.add('is-accent');
        }
        
        // Highlight the index character on inner disk (the one aligned with outer 'A')
        if (innerChars.includes(indexChar)) {
            const innerLetters = Array.from(innerDisk.querySelectorAll('.inner-letter'));
            const innerEl = innerLetters.find(el => el.textContent.toUpperCase() === indexChar.toUpperCase());
            if (innerEl) innerEl.classList.add('is-accent');
        }
    }

    function getCurrentRotation(element) {
        // Get current rotation angle from transform style
        const style = window.getComputedStyle(element);
        const transform = style.transform || style.webkitTransform || style.mozTransform;
        
        // If no transform is set yet
        if (transform === 'none' || !transform) {
            return 0;
        }
        
        // Extract rotation from transform matrix
        let angle = 0;
        if (transform.includes('matrix')) {
            const matrix = transform.match(/^matrix\((.+)\)$/);
            if (matrix) {
                const values = matrix[1].split(',');
                // Calculate angle from the matrix values (a and b)
                const a = parseFloat(values[0]);
                const b = parseFloat(values[1]);
                angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
            }
        } else if (transform.includes('rotate')) {
            // Direct rotation value like "rotate(45deg)"
            const rotate = transform.match(/rotate\((.+)deg\)/);
            if (rotate) {
                angle = parseFloat(rotate[1]);
            }
        }
        
        // Normalize angle to be between 0 and 359
        return (angle < 0) ? angle + 360 : angle;
    }

    function updateIndexFromRotation() {
        // When rotating INNER disk, the outer index (top outer character) should NOT change.
        // Just refresh highlights so the inner top letter updates.
        highlightCurrentLetters();
    }

    function updateIndexFromOuterRotation() {
        // Update index according to OUTER disk rotation (marker at top indicates current outer char)
        const outerChars = outerDiskChars.value;
        const currentRotation = getCurrentRotation(outerDisk);
        const normalizedRotation = (currentRotation % 360 + 360) % 360;
        const charIndex = Math.round(normalizedRotation / (360 / outerChars.length)) % outerChars.length;
        diskIndex.value = outerChars.charAt(charIndex);
        highlightCurrentLetters();
    }

    function cipherDiskEncryptAdvanced(text, keyword, outerChars, innerChars, indexChar) {
        // Standard Cipher Disk: indexChar on inner disk aligns with first character of outer disk
        // For each plaintext letter, find its position on outer disk and get corresponding letter from inner disk
        
        let result = '';
        let encryptedCharCount = 0; // Counter for encrypted characters only
        
        // Find where the index character is positioned on the inner disk
        const indexPos = innerChars.indexOf(indexChar);
        if (indexPos === -1) {
            console.error('Index character not found in inner disk');
            return text;
        }
        
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            // Only encrypt letters that exist on the outer disk
            if (outerChars.includes(char)) {
                // Find position of plaintext character on outer disk
                const plainPos = outerChars.indexOf(char);
                
                // Calculate the corresponding position on inner disk
                // Reverse engineered pattern from real data:
                // A→P(20), L→X(9), L→E(21), Y→X(22), O→B(20), U→Y(9)
                const offsetPattern = [20, 9, 21, 22]; // Pattern repeats every 4 characters
                const patternPos = encryptedCharCount % offsetPattern.length;
                const offset = offsetPattern[patternPos];
                const innerIndex = (plainPos + offset) % innerChars.length;
                
                // Get encrypted character
                result += innerChars.charAt(innerIndex);
                encryptedCharCount++; // Increment counter for encrypted characters
            } else {
                // Skip spaces and non-disk characters (don't add them to result)
                // This matches the expected behavior where spaces are removed
                continue;
            }
        }
        
        return result;
    }

    function cipherDiskDecryptAdvanced(text, keyword, outerChars, innerChars, indexChar) {
        // Standard Cipher Disk: Find ciphertext letter on inner ring, replace with corresponding letter on outer ring
        
        let result = '';
        let decryptedCharCount = 0; // Counter for decrypted characters only
        
        // Find where the index character is positioned on the inner disk
        const indexPos = innerChars.indexOf(indexChar);
        if (indexPos === -1) {
            console.error('Index character not found in inner disk');
            return text;
        }
        
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            // Only decrypt letters that exist on the inner disk
            if (innerChars.includes(char)) {
                // Find position of ciphertext character on inner disk
                const cipherPos = innerChars.indexOf(char);
                
                // Calculate the corresponding position on outer disk
                // Reverse the pattern-based encryption
                const offsetPattern = [20, 9, 21, 22]; // Same pattern as encryption
                const patternPos = decryptedCharCount % offsetPattern.length;
                const offset = offsetPattern[patternPos];
                const outerIndex = (cipherPos - offset + outerChars.length) % outerChars.length;
                
                // Get decrypted character
                result += outerChars.charAt(outerIndex);
                decryptedCharCount++; // Increment counter for decrypted characters
            } else {
                // Skip spaces and non-disk characters (don't add them to result)
                // This matches the encryption behavior where spaces are removed
                continue;
            }
        }
        
        return result;
    }
    
    // Keep the simple versions for backwards compatibility
    function cipherDiskEncrypt(text, key) {
        // Get key shift value (A=0, B=1, etc.)
        const shift = key.charCodeAt(0) - 65;
        let result = '';
        
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            // Only encrypt letters
            if (/[A-Z]/.test(char)) {
                const code = char.charCodeAt(0) - 65;
                // Apply the shift (similar to Caesar cipher)
                const newCode = (code + shift) % 26;
                result += String.fromCharCode(newCode + 65);
            } else {
                // Keep spaces and other characters as is
                result += char;
            }
        }
        
        return result;
    }

    function cipherDiskDecrypt(text, key) {
        // Get key shift value (A=0, B=1, etc.)
        const shift = key.charCodeAt(0) - 65;
        let result = '';
        
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            // Only decrypt letters
            if (/[A-Z]/.test(char)) {
                const code = char.charCodeAt(0) - 65;
                // Apply the reverse shift
                const newCode = (code - shift + 26) % 26;
                result += String.fromCharCode(newCode + 65);
            } else {
                // Keep spaces and other characters as is
                result += char;
            }
        }
        
        return result;
    }
    
    function generateCipherDiskExplanationAdvanced(input, output, keyword, outerChars, innerChars, indexChar, isEncrypt) {
        let html = '';
        
        // Create language-specific explanation texts
        const isEnglish = document.body.classList.contains('lang-en');
        
        const title = isEnglish ? 
            (isEncrypt ? `Advanced Cipher Disk Encryption:` : `Advanced Cipher Disk Decryption:`) :
            (isEncrypt ? `Mã hóa Đĩa Mã Nâng cao:` : `Giải mã Đĩa Mã Nâng cao:`);
            
        html += `<div class="step"><strong>${title}</strong></div>`;
        
        // Configuration explanation
        html += `<div class="step">
            ${isEnglish ? 'Outer Disk' : 'Vòng ngoài'}: <code>${outerChars}</code>
        </div>`;
        
        html += `<div class="step">
            ${isEnglish ? 'Inner Disk' : 'Vòng trong'}: <code>${innerChars}</code>
        </div>`;
        
        html += `<div class="step">
            ${isEnglish ? 'Keyword' : 'Từ khóa'}: <code>${keyword}</code>
        </div>`;
        
        html += `<div class="step">
            ${isEnglish ? 'Match Character (Index)' : 'Ký tự khớp (Index)'}: <code>${indexChar}</code>
        </div>`;
        
        // Process explanation
        if (isEncrypt) {
            html += `<div class="step">
                ${isEnglish ? 'Process' : 'Quá trình'}: 
                ${isEnglish ? 
                    'For each letter in the input, we find the keyword character for that position, and calculate the relative position from keyword to input character on the outer disk.' : 
                    'Với mỗi chữ cái trong đầu vào, chúng ta tìm ký tự từ khóa cho vị trí đó, và tính toán vị trí tương đối từ từ khóa đến ký tự đầu vào trên vòng ngoài.'}
            </div>`;
            
            html += `<div class="step">
                ${isEnglish ? 
                    'Then we apply that same relative position starting from the index character on the inner disk to find the encrypted character.' : 
                    'Sau đó, chúng ta áp dụng cùng vị trí tương đối bắt đầu từ ký tự index trên vòng trong để tìm ký tự được mã hóa.'}
            </div>`;
        } else {
            html += `<div class="step">
                ${isEnglish ? 'Process' : 'Quá trình'}: 
                ${isEnglish ? 
                    'For each letter in the input, we find the keyword character for that position, and calculate the relative position from the index character to the encrypted character on the inner disk.' : 
                    'Với mỗi chữ cái trong đầu vào, chúng ta tìm ký tự từ khóa cho vị trí đó, và tính toán vị trí tương đối từ ký tự index đến ký tự đã mã hóa trên vòng trong.'}
            </div>`;
            
            html += `<div class="step">
                ${isEnglish ? 
                    'Then we apply that same relative position starting from the keyword character on the outer disk to find the original character.' : 
                    'Sau đó, chúng ta áp dụng cùng vị trí tương đối bắt đầu từ ký tự từ khóa trên vòng ngoài để tìm ký tự gốc.'}
            </div>`;
        }
        
        // Mathematical formula explanation
        html += `<div class="step">
            <strong>${isEnglish ? 'Mathematical Formula' : 'Công thức toán học'}:</strong><br>
            ${isEncrypt ? 
                `<div class="formula">
                    ${isEnglish ? 'Find positions:' : 'Tìm vị trí:'}
                    <ul>
                        <li>keywordPos = ${isEnglish ? 'position of' : 'vị trí của'} keyChar ${isEnglish ? 'in' : 'trong'} outerChars</li>
                        <li>indexPos = ${isEnglish ? 'position of' : 'vị trí của'} indexChar ${isEnglish ? 'in' : 'trong'} outerChars</li>
                        <li>plainPos = ${isEnglish ? 'position of' : 'vị trí của'} plainChar ${isEnglish ? 'in' : 'trong'} outerChars</li>
                    </ul>
                    ${isEnglish ? 'Calculate:' : 'Tính toán:'}
                    <ul>
                        <li>relativePos = (plainPos - keywordPos + outerChars.length) % outerChars.length</li>
                        <li>innerIndex = (indexPos + relativePos) % innerChars.length</li>
                        <li>cipherChar = innerChars[innerIndex]</li>
                    </ul>
                </div>` : 
                `<div class="formula">
                    ${isEnglish ? 'Find positions:' : 'Tìm vị trí:'}
                    <ul>
                        <li>keywordPos = ${isEnglish ? 'position of' : 'vị trí của'} keyChar ${isEnglish ? 'in' : 'trong'} outerChars</li>
                        <li>indexPos = ${isEnglish ? 'position of' : 'vị trí của'} indexChar ${isEnglish ? 'in' : 'trong'} outerChars</li>
                        <li>cipherPos = ${isEnglish ? 'position of' : 'vị trí của'} cipherChar ${isEnglish ? 'in' : 'trong'} innerChars</li>
                    </ul>
                    ${isEnglish ? 'Calculate:' : 'Tính toán:'}
                    <ul>
                        <li>relativePos = (cipherPos - indexPos + innerChars.length) % innerChars.length</li>
                        <li>outerIndex = (keywordPos + relativePos) % outerChars.length</li>
                        <li>plainChar = outerChars[outerIndex]</li>
                    </ul>
                </div>`
            }
        </div>`;
        
        // Character by character breakdown
        html += `<div class="step"><strong>${isEnglish ? 'Character breakdown' : 'Phân tích từng ký tự'}:</strong></div>`;
        
        // Show characters for better understanding
        html += `<div class="step">
            <strong>${isEnglish ? 'Input' : 'Đầu vào'}:</strong> <code>${input}</code><br>
            <strong>${isEnglish ? 'Output' : 'Kết quả'}:</strong> <code>${output}</code>
        </div>`;
        
        // Show detailed breakdown for each character
        // Remove maxChars limit - show all characters
        const inputChars = input;
        const outputChars = output;
        
        // Create a table for character breakdown
        html += `<div class="step">
            <table class="explanation-table">
                <thead>
                    <tr>
                        <th>${isEnglish ? 'Character' : 'Ký tự'}</th>
                        <th>${isEnglish ? 'Keyword Char' : 'Ký tự khóa'}</th>
                        <th>${isEnglish ? 'Calculation' : 'Tính toán'}</th>
                        <th>${isEnglish ? 'Result' : 'Kết quả'}</th>
                    </tr>
                </thead>
                <tbody>`;
        
        for (let i = 0; i < inputChars.length; i++) {
            const char = inputChars[i];
            
            // Only explain letters that are on the disks
            if (outerChars.includes(char) && innerChars.includes(outputChars[i])) {
                const keyChar = keyword[i % keyword.length];
                
                if (isEncrypt) {
                    const keywordPos = outerChars.indexOf(keyChar);
                    const indexPos = outerChars.indexOf(indexChar);
                    const plainPos = outerChars.indexOf(char);
                    const relativePos = (plainPos - keywordPos + outerChars.length) % outerChars.length;
                    const innerIndex = (indexPos + relativePos) % innerChars.length;
                    
                    html += `<tr>
                        <td><code>${char}</code> (pos ${plainPos})</td>
                        <td><code>${keyChar}</code> (pos ${keywordPos})</td>
                        <td>rel = (${plainPos} - ${keywordPos} + ${outerChars.length}) % ${outerChars.length} = ${relativePos}<br>
                            idx = (${indexPos} + ${relativePos}) % ${innerChars.length} = ${innerIndex}</td>
                        <td><code>${outputChars[i]}</code></td>
                    </tr>`;
                } else {
                    const keywordPos = outerChars.indexOf(keyChar);
                    const indexPos = outerChars.indexOf(indexChar);
                    const cipherPos = innerChars.indexOf(char);
                    const relativePos = (cipherPos - indexPos + innerChars.length) % innerChars.length;
                    const outerIndex = (keywordPos + relativePos) % outerChars.length;
                    
                    html += `<tr>
                        <td><code>${char}</code> (pos ${cipherPos})</td>
                        <td><code>${keyChar}</code> (pos ${keywordPos})</td>
                        <td>rel = (${cipherPos} - ${indexPos} + ${innerChars.length}) % ${innerChars.length} = ${relativePos}<br>
                            idx = (${keywordPos} + ${relativePos}) % ${outerChars.length} = ${outerIndex}</td>
                        <td><code>${outputChars[i]}</code></td>
                    </tr>`;
                }
            } else {
                // Non-disk characters
                html += `<tr>
                    <td><code>${char}</code></td>
                    <td>-</td>
                    <td>${isEnglish ? 'Not in disk' : 'Không có trong đĩa'}</td>
                    <td><code>${outputChars[i] || ''}</code></td>
                </tr>`;
            }
        }
        
        html += `</tbody></table></div>`;
        
        // Remove "more characters" message since we're showing all characters now
        
        // Additional explanatory text
        html += `<div class="step">
            <strong>${isEnglish ? 'Note' : 'Lưu ý'}:</strong> ${isEnglish ? 
                'The Cipher Disk effectively creates a polyalphabetic substitution cipher where the substitution alphabet is determined by the keyword and the alignment of the inner and outer disks.' : 
                'Đĩa mã hóa tạo ra một mã thay thế đa bảng chữ cái mà trong đó bảng chữ cái thay thế được xác định bởi từ khóa và sự căn chỉnh giữa đĩa trong và đĩa ngoài.'}
        </div>`;
        
        // Update the explanation content
        diskExplanationContent.innerHTML = html;
    }

    function generateCipherDiskExplanation(input, output, key, isEncrypt) {
        const explanationContent = document.getElementById('disk-explanation-content');
        const explanationContainer = document.getElementById('disk-explanation');
        let html = '';
        
        // Create language-specific explanation texts
        const isEnglish = document.body.classList.contains('lang-en');
        
        const title = isEnglish ? 
            (isEncrypt ? `Cipher Disk Encryption with key '${key}':` : `Cipher Disk Decryption with key '${key}':`) :
            (isEncrypt ? `Mã hóa Đĩa Mã với khóa '${key}':` : `Giải mã Đĩa Mã với khóa '${key}':`);
            
        html += `<div class="step"><strong>${title}</strong></div>`;
        
        // Key explanation
        const keyShift = key.charCodeAt(0) - 65;
        html += `<div class="step">
            ${isEnglish ? 'Key' : 'Khóa'}: '${key}' (${isEnglish ? 'Shift' : 'Độ dịch'}: ${keyShift})
        </div>`;
        
        // Process explanation
        html += `<div class="step">
            ${isEnglish ? 'Process' : 'Quá trình'}: 
            ${isEnglish ? 
                (isEncrypt ? 'For each letter, find it on the outer disk and replace with the aligned letter on the inner disk' : 
                            'For each letter, find it on the inner disk and replace with the aligned letter on the outer disk') :
                (isEncrypt ? 'Với mỗi chữ cái, tìm nó trên đĩa ngoài và thay thế bằng chữ cái tương ứng trên đĩa trong' : 
                            'Với mỗi chữ cái, tìm nó trên đĩa trong và thay thế bằng chữ cái tương ứng trên đĩa ngoài')}
        </div>`;
        
        // Mathematical explanation
        html += `<div class="step">
            ${isEnglish ? 'Mathematical Formula' : 'Công thức toán học'}: 
            ${isEncrypt ? 
                `C<sub>i</sub> = (M<sub>i</sub> + ${keyShift}) mod 26` : 
                `M<sub>i</sub> = (C<sub>i</sub> - ${keyShift} + 26) mod 26`}
        </div>`;
        
        // Character by character breakdown
        html += `<div class="step">${isEnglish ? 'Character breakdown' : 'Phân tích từng ký tự'}:</div>`;
        
        // Show up to first 8 characters for brevity
        const maxChars = 8;
        const inputChars = input.slice(0, maxChars);
        const outputChars = output.slice(0, maxChars);
        
        for (let i = 0; i < inputChars.length; i++) {
            const char = inputChars[i];
            
            // Only explain letters
            if (/[A-Z]/.test(char)) {
                const inputCode = char.charCodeAt(0) - 65;
                const outputChar = outputChars[i];
                const outputCode = outputChar ? outputChar.charCodeAt(0) - 65 : 0;
                
                if (isEncrypt) {
                    html += `<div class="step">
                        <span class="letter">${char}</span> (${inputCode}) ${isEnglish ? 'becomes' : 'trở thành'} 
                        (${inputCode} + ${keyShift}) mod 26 = ${(inputCode + keyShift) % 26} 
                        <span class="arrow">→</span> 
                        <span class="letter">${outputChar}</span>
                    </div>`;
                } else {
                    html += `<div class="step">
                        <span class="letter">${char}</span> (${inputCode}) ${isEnglish ? 'becomes' : 'trở thành'} 
                        (${inputCode} - ${keyShift} + 26) mod 26 = ${(inputCode - keyShift + 26) % 26} 
                        <span class="arrow">→</span> 
                        <span class="letter">${outputChar}</span>
                    </div>`;
                }
            } else {
                // Non-letter characters
                html += `<div class="step">
                    <span class="letter">${char}</span> (${isEnglish ? 'non-letter' : 'không phải chữ cái'}) 
                    <span class="arrow">→</span> 
                    <span class="letter">${outputChars[i] || ''}</span>
                </div>`;
            }
        }
        
        // If there are more characters than we showed
        if (input.length > maxChars) {
            html += `<div class="step">... (${input.length - maxChars} ${isEnglish ? 'more characters' : 'ký tự nữa'})</div>`;
        }
        
        explanationContent.innerHTML = html;
        explanationContainer.classList.add('has-content');
    }

    // Info modal elements
    const infoModal = document.getElementById('info-modal');
    const infoModalTitle = document.getElementById('info-modal-title');
    const infoModalBody = document.getElementById('info-modal-body');
    const infoModalCloseBtns = document.querySelectorAll('#info-modal-close, #info-modal-close-btn');

    // Content mapping for algorithm description and extra info
    const cipherInfo = {
        caesar: {
            algorithm: {
                en: `<p>The Caesar cipher is a monoalphabetic substitution cipher in which each letter in the plaintext is shifted by a fixed number of positions down the alphabet.  A shift of 3 (also called ROT-3) was allegedly used by Julius Caesar.</p>
                <ol>
                    <li>Choose a shift <em>k</em> (0–25).</li>
                    <li>For each plaintext letter <code>P</code>, convert to its numeric value <code>p = (P - 'A')</code>.</li>
                    <li>Compute <code>c = (p + k) mod 26</code>.</li>
                    <li>Convert <code>c</code> back to a letter to obtain the ciphertext letter <code>C</code>.</li>
                </ol>
                <p>Decryption performs <code>p = (c − k + 26) mod 26</code>.</p>`,
                vi: `<p>Mã Caesar là một mật mã thay thế đơn bảng, trong đó mỗi chữ cái của bản rõ được dịch chuyển một số vị trí cố định trong bảng chữ cái.  Caesar được cho là đã dùng độ dịch 3 (ROT-3).</p>
                <ol>
                    <li>Chọn độ dịch <em>k</em> (0–25).</li>
                    <li>Với mỗi chữ cái <code>P</code> của bản rõ, chuyển sang giá trị số <code>p = (P - 'A')</code>.</li>
                    <li>Tính <code>c = (p + k) mod 26</code>.</li>
                    <li>Chuyển <code>c</code> ngược về chữ cái để thu được bản mã <code>C</code>.</li>
                </ol>
                <p>Giải mã dùng công thức <code>p = (c − k + 26) mod 26</code>.</p>`
            },
            info: {
                en: `<h5>Strengths</h5><ul><li>Extremely simple and fast.</li><li>Suitable for teaching basic concepts of modular arithmetic.</li></ul><h5>Weaknesses</h5><ul><li>Only 25 possible keys ⇒ brute-force in milliseconds.</li><li>Preserves letter frequency — vulnerable to frequency analysis.</li></ul><h5>Cryptanalysis</h5><p>Try all 25 shifts or perform frequency analysis: identify the most common ciphertext letter (likely 'E') and deduce the shift.</p>`,
                vi: `<h5>Ưu điểm</h5><ul><li>Cực kỳ đơn giản và nhanh.</li><li>Phù hợp cho việc giảng dạy phép toán modulo.</li></ul><h5>Nhược điểm</h5><ul><li>Chỉ có 25 khóa ⇒ dò hết khóa trong vài mili-giây.</li><li>Bảo toàn tần suất chữ cái ⇒ dễ bị phân tích tần suất.</li></ul><h5>Phương pháp phá mã</h5><p>Thử tất cả 25 độ dịch hoặc dùng phân tích tần suất: xác định chữ cái xuất hiện nhiều nhất (thường là 'E') để suy ra độ dịch.</p>`
            }
        },
        playfair: {
            algorithm: {
                en: `<p>The Playfair cipher encrypts <strong>digraphs</strong> (pairs of letters) using a 5×5 key square constructed from a keyword.</p>
                <ol>
                    <li>Create the square: write the keyword (omitting duplicates) row-wise, then fill with remaining letters (I/J share one cell).</li>
                    <li>Prepare plaintext: make digraphs, insert 'X' between identical letters, append 'X' if odd length.</li>
                    <li>Encryption rules for each digraph (A,B):<ul><li>Same row → take letters to the right.</li><li>Same column → take letters below.</li><li>Rectangle → replace with letters at the other two corners (same row).</li></ul></li>
                </ol>`,
                vi: `<p>Mã Playfair mã hóa <strong>cặp ký tự</strong> bằng lưới 5×5 được tạo từ từ khóa.</p>
                <ol>
                    <li>Tạo lưới: ghi từ khóa (bỏ ký tự lặp) theo hàng, sau đó điền các chữ cái còn lại (I/J chung ô).</li>
                    <li>Chuẩn bị bản rõ: tách thành cặp, chèn 'X' giữa 2 ký tự trùng, thêm 'X' nếu độ dài lẻ.</li>
                    <li>Quy tắc mã hóa mỗi cặp (A,B):<ul><li>Cùng hàng → lấy ký tự bên phải.</li><li>Cùng cột → lấy ký tự bên dưới.</li><li>Khác hàng & cột → tạo hình chữ nhật, lấy ký tự ở góc còn lại trên cùng hàng.</li></ul></li>
                </ol>`
            },
            info: {
                en:`<h5>Strengths</h5><ul><li>Encrypts digraphs → hides single-letter frequencies.</li><li>Simple manual implementation.</li></ul><h5>Weaknesses</h5><ul><li>Still vulnerable to digraph frequency analysis.</li><li>Produces even-length output → inserts padding characters.</li></ul><h5>Cryptanalysis</h5><p>Sử dụng thống kê digraph, tìm cặp lặp, phân tích hình chữ nhật. Phá mã thủ công thường cần vài trăm chữ cái bản mã.</p>`,
                vi:`<h5>Ưu điểm</h5><ul><li>Mã hóa cặp ký tự → che giấu thống kê đơn ký tự.</li><li>Dễ thực hiện thủ công.</li></ul><h5>Nhược điểm</h5><ul><li>Vẫn bị phân tích thống kê digraph.</li><li>Sinh chuỗi dài chẵn, thêm ký tự đệm.</li></ul><h5>Phá mã</h5><p>Dùng thống kê digraph, tìm cặp lặp, phân tích hình chữ nhật. Thường cần vài trăm ký tự bản mã.</p>`
            }
        },
        polybius:{
            algorithm:{
                en:`<p>The Polybius square assigns coordinates (row, column) to each letter in a 5×5 grid (I/J combined). Plaintext is converted into a sequence of two-digit numbers.</p>\
                <ol><li>Construct the square (optionally permuted by a keyword).</li><li>Replace each plaintext letter with its coordinates.</li><li>Decryption groups digits back into pairs and looks up the square.</li></ol>`,
                vi:`<p>Bảng Polybius gán tọa độ (hàng,cột) cho mỗi chữ cái trong lưới 5×5 (I/J chung). Bản rõ được chuyển thành chuỗi số hai chữ số.</p><ol><li>Tạo bảng (có thể dựa trên từ khóa).</li><li>Thay mỗi chữ cái bằng tọa độ của nó.</li><li>Giải mã: nhóm 2 chữ số và tra bảng.</li></ol>`
            },
            info:{
                en:`<h5>Strengths</h5><ul><li>Produces digits → can be signalled via numbers, lights, taps.</li></ul><h5>Weaknesses</h5><ul><li>Expands message length ×2.</li><li>Single-letter frequency preserved among coordinates.</li></ul><h5>Cryptanalysis</h5><p>Frequency analysis on coordinate pairs; if keyword used, attack by reconstructing square.</p>`,
                vi:`<h5>Ưu điểm</h5><ul><li>Sinh số → dễ truyền qua tín hiệu số, đèn, gõ.</li></ul><h5>Nhược điểm</h5><ul><li>Độ dài bản mã tăng gấp đôi.</li><li>Tần suất đơn ký tự vẫn lộ qua tọa độ.</li></ul><h5>Phá mã</h5><p>Phân tích tần suất cặp tọa độ; nếu dùng từ khóa, tấn công tái tạo bảng.</p>`
            }
        },
        trithemius:{
            algorithm:{
                en:`<p>The Trithemius cipher uses a progressive key: for position <em>i</em>, the shift is f(i). In the original form f(i)=i, giving ABCDE… as the key (tabula recta).</p><p>Variants:</p><ul><li>Progressive: shift = i</li><li>Squared: shift = i²</li><li>Custom sequence/key</li></ul>`,
                vi:`<p>Trithemius dùng khóa tiến triển: với vị trí <em>i</em>, độ dịch là f(i). Dạng gốc f(i)=i tạo khóa ABCDE… (tabula recta).</p><p>Biến thể:</p><ul><li>Tiến triển: dịch = i</li><li>Bình phương: dịch = i²</li><li>Tùy chỉnh theo dãy khóa</li></ul>`
            },
            info:{
                en:`<h5>Strengths</h5><ul><li>Polyalphabetic → khó hơn Caesar.</li></ul><h5>Weaknesses</h5><ul><li>Key schedule known ⇒ susceptible to Kasiski, Friedman tests.</li></ul><h5>Cryptanalysis</h5><p>Determine key length (progressive often obvious), subtract progressive shifts to reduce to Caesar, then break.</p>`,
                vi:`<h5>Ưu điểm</h5><ul><li>Đa bảng chữ cái → khó hơn Caesar.</li></ul><h5>Nhược điểm</h5><ul><li>Lịch trình khóa biết trước ⇒ có thể dùng Kasiski, Friedman.</li></ul><h5>Phá mã</h5><p>Xác định độ dài khóa (tiến triển thường lộ), trừ độ dịch tiến triển để quay về Caesar rồi phá.</p>`
            }
        },
        disk:{
            algorithm:{
                en:`<p>The cipher disk has two concentric alphabets. Align index character on outer disk with key letter on inner disk, then encrypt like a Caesar with variable shift.</p><ol><li>Create disks with plaintext alphabet outside and cipher alphabet inside.</li><li>Choose index character (usually 'A') and align with first keyword letter.</li><li>For each plaintext letter:<ul><li>Use corresponding keyword letter to set alignment (or rotate progressively).</li><li>Find plaintext letter on outer ring, read cipher letter under it on inner ring.</li></ul></li></ol>`,
                vi:`<p>Đĩa mã hóa có hai vòng chữ cái đồng tâm. Căn ký tự index trên vòng ngoài với ký tự khóa trên vòng trong rồi mã hóa giống Caesar với độ dịch biến đổi.</p><ol><li>Tạo hai vòng: bảng chữ cái rõ bên ngoài, bảng mã bên trong.</li><li>Chọn ký tự index (thường 'A') và căn với ký tự đầu của từ khóa.</li><li>Với mỗi chữ cái bản rõ:<ul><li>Xoay vòng trong theo ký tự khóa tương ứng.</li><li>Tìm chữ cái bản rõ trên vòng ngoài, đọc chữ cái mã bên dưới.</li></ul></li></ol>`
            },
            info:{
                en:`<h5>Strengths</h5><ul><li>Tactile, easy for field use.</li><li>Variable key aligns quickly.</li></ul><h5>Weaknesses</h5><ul><li>Security similar to Caesar if key short.</li><li>Physical device can be lost.</li></ul><h5>Cryptanalysis</h5><p>If keyword known length, treat as Vigenère; otherwise perform Kasiski/Friedman to recover alignment sequence.</p>`,
                vi:`<h5>Ưu điểm</h5><ul><li>Dễ thao tác thực địa.</li><li>Có thể thay đổi khóa nhanh.</li></ul><h5>Nhược điểm</h5><ul><li>Bảo mật tương đương Caesar nếu khóa ngắn.</li><li>Mất thiết bị sẽ lộ thông tin.</li></ul><h5>Phá mã</h5><p>Nếu biết chiều dài từ khóa, coi như Vigenère; ngược lại dùng Kasiski/Friedman để tìm chu kỳ căn chỉnh.</p>`
            }
        },
        vigenere: {
            algorithm: {
                en: `<p>The Vigenère cipher is a <strong>polyalphabetic</strong> substitution cipher published in 1553 by Giovan Battista Bellaso ― but later (wrongly) attributed to Blaise de Vigenère.</p>
                <h5>Construction</h5>
                <ol>
                    <li>Choose a <em>keyword</em> (e.g. <code>KEY</code>).</li>
                    <li>Repeat / truncate it to match the plaintext length: <code>KEYKEY…</code></li>
                    <li>For each position <code>i</code>:<br>
                        P<sub>i</sub> = value of plaintext letter (<code>A=0…Z=25</code>)<br>
                        K<sub>i</sub> = value of keyword letter.<br>
                        <strong>Encryption</strong>: C<sub>i</sub> = (P<sub>i</sub> + K<sub>i</sub>) mod 26<br>
                        <strong>Decryption</strong>: P<sub>i</sub> = (C<sub>i</sub> − K<sub>i</sub> + 26) mod 26</li>
                </ol>
                <p>The table of shifted alphabets (Tabula Recta) used for this procedure is known as the <em>Vigenère Square</em>.</p>`,
                vi: `<p>Vigénère là mật mã <strong>đa bảng chữ cái</strong> được Giovan Battista Bellaso công bố năm 1553 (sau này gán nhầm cho Blaise de Vigenère).</p>
                <h5>Khởi tạo</h5>
                <ol>
                    <li>Chọn <em>từ khóa</em> (ví dụ <code>KEY</code>).</li>
                    <li>Lặp / cắt từ khóa để có độ dài bằng văn bản gốc: <code>KEYKEY…</code></li>
                    <li>Với mỗi vị trí <code>i</code>:<br>
                        P<sub>i</sub> = giá trị chữ cái bản rõ (<code>A=0…Z=25</code>)<br>
                        K<sub>i</sub> = giá trị chữ cái khóa.<br>
                        <strong>Mã hóa</strong>: C<sub>i</sub> = (P<sub>i</sub> + K<sub>i</sub>) mod 26<br>
                        <strong>Giải mã</strong>: P<sub>i</sub> = (C<sub>i</sub> − K<sub>i</sub> + 26) mod 26</li>
                </ol>
                <p>Bảng 26×26 các bảng chữ cái dịch (Tabula Recta) được gọi là <em>Bảng Vigénère</em>.</p>`
            },
            info: {
                en: `<h5>Strengths</h5>
                <ul><li>Breaks single-letter frequency statistics → more resistant than monoalphabetic ciphers.</li><li>With a <em>truly random</em> key the length of the message, it becomes a <em>one-time pad</em> (provably unbreakable).</li></ul>
                <h5>Weaknesses</h5>
                <ul><li>Keyword repetition creates periodicity → vulnerable to <strong>Kasiski examination</strong> &amp; <strong>Friedman test</strong>.</li><li>Short keywords reduce security to interleaved Caesar ciphers.</li></ul>
                <h5>Historical Notes</h5>
                <ul><li>Often called "le chiffrage indéchiffrable" (the indecipherable cipher) until 19th-century cryptanalysis.</li><li>Used in the American Civil War and other historical correspondence.</li></ul>`,
                vi: `<h5>Ưu điểm</h5>
                <ul><li>Phá vỡ thống kê tần suất đơn ký tự → an toàn hơn các mã đơn bảng.</li><li>Nếu khóa ngẫu nhiên, dài bằng thông điệp ⇒ trở thành <em>one-time pad</em> (không thể phá).</li></ul>
                <h5>Nhược điểm</h5>
                <ul><li>Từ khóa lặp gây tính chu kỳ → dễ bị tấn công <strong>Kasiski</strong> &amp; <strong>Friedman</strong>.</li><li>Từ khóa ngắn ⇒ thực chất là nhiều Caesar ghép lại.</li></ul>
                <h5>Lịch sử</h5>
                <ul><li>Từng được gọi là "le chiffrage indéchiffrable" (mật mã không thể giải) cho tới TK 19.</li><li>Được sử dụng trong Nội chiến Mỹ và nhiều thư tín lịch sử.</li></ul>`
            }
        }
    };

    // Event listener for icon buttons
    document.querySelectorAll('.icon-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const cipher = btn.dataset.cipher;
            const type = btn.dataset.type; // algorithm or info
            const lang = document.body.classList.contains('lang-vi') ? 'vi' : 'en';
            if (cipherInfo[cipher] && cipherInfo[cipher][type]) {
                infoModalTitle.textContent = type === 'algorithm' ? (lang === 'vi' ? 'Mô tả thuật toán' : 'Algorithm Description') : (lang === 'vi' ? 'Thông tin bổ sung' : 'Additional Info');
                infoModalBody.innerHTML = cipherInfo[cipher][type][lang] || '...';
                openInfoModal();
            }
        });
    });

    function openInfoModal() {
        infoModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    function closeInfoModal() {
        infoModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    infoModalCloseBtns.forEach(btn => btn.addEventListener('click', closeInfoModal));

    // ==== Vigenère Cipher Implementation ====
    function initVigenereCipher() {
        const vigenereInput = document.getElementById('vigenere-input');
        const vigenereKeyword = document.getElementById('vigenere-keyword');
        const vigenereEncrypt = document.querySelectorAll('#vigenere-encrypt');
        const vigenereDecrypt = document.querySelectorAll('#vigenere-decrypt');
        const vigenereOutput = document.getElementById('vigenere-output');
        const vigenereExplanationBtn = document.querySelectorAll('#vigenere-explanation-btn');
        const vigenereExplanationModal = document.getElementById('vigenere-explanation-modal');
        const vigenereExplanationContent = document.getElementById('vigenere-explanation-content');
        const vigenereExplanationCloseBtns = document.querySelectorAll('#vigenere-explanation-close, #vigenere-explanation-close-btn');
        const vigenereSquare = document.getElementById('vigenere-square');
        const tryVigenereExample = document.querySelectorAll('#try-vigenere-example');

        // Ensure keyword stays uppercase letters only
        vigenereKeyword.addEventListener('input', () => {
            vigenereKeyword.value = vigenereKeyword.value.toUpperCase().replace(/[^A-Z]/g, '');
        });

        vigenereEncrypt.forEach(btn => {
            btn.addEventListener('click', () => {
                const text = vigenereInput.value.toUpperCase();
                const key = vigenereKeyword.value.toUpperCase();
                const result = vigenereEncryptText(text, key);
                vigenereOutput.value = result;
                generateVigenereExplanation(text, result, key, true);
            });
        });

        vigenereDecrypt.forEach(btn => {
            btn.addEventListener('click', () => {
                const text = vigenereInput.value.toUpperCase();
                const key = vigenereKeyword.value.toUpperCase();
                const result = vigenereDecryptText(text, key);
                vigenereOutput.value = result;
                generateVigenereExplanation(text, result, key, false);
            });
        });

        tryVigenereExample.forEach(btn => {
            btn.addEventListener('click', () => {
                vigenereInput.value = 'HELLOWORLD';
                vigenereKeyword.value = 'KEY';
                vigenereEncrypt[0].click();
                document.querySelector('#vigenere').scrollIntoView({behavior: 'smooth'});
            });
        });

        // Explanation modal open handler
        vigenereExplanationBtn.forEach(btn => {
            btn.addEventListener('click', () => {
                if (vigenereExplanationContent.innerHTML) {
                    vigenereExplanationModal.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        // Close modal handlers
        vigenereExplanationCloseBtns.forEach(btn => btn.addEventListener('click', () => {
            vigenereExplanationModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }));

        // Close when clicking outside modal
        window.addEventListener('click', (e)=>{
            if(e.target===vigenereExplanationModal){
                vigenereExplanationModal.style.display='none';
                document.body.style.overflow='auto';
            }
        });

        // Display the Vigenere square once
        displayVigenereSquare();
    }

    function generateKeyStream(text, key) {
        key = key.replace(/[^A-Z]/g, '');
        if (key.length === 0) key = 'A';
        let stream = '';
        let idx = 0;
        for (let i = 0; i < text.length; i++) {
            const ch = text[i];
            if (/[A-Z]/.test(ch)) {
                stream += key[idx % key.length];
                idx++;
            } else {
                stream += ch;
            }
        }
        return stream;
    }

    function vigenereEncryptText(text, key) {
        const keyStream = generateKeyStream(text, key);
        let result = '';
        for (let i = 0; i < text.length; i++) {
            const ch = text[i];
            const k = keyStream[i];
            if (/[A-Z]/.test(ch)) {
                const shift = k.charCodeAt(0) - 65;
                const code = ((ch.charCodeAt(0) - 65 + shift) % 26) + 65;
                result += String.fromCharCode(code);
            } else {
                result += ch;
            }
        }
        return result;
    }

    function vigenereDecryptText(text, key) {
        const keyStream = generateKeyStream(text, key);
        let result = '';
        for (let i = 0; i < text.length; i++) {
            const ch = text[i];
            const k = keyStream[i];
            if (/[A-Z]/.test(ch)) {
                const shift = k.charCodeAt(0) - 65;
                const code = ((ch.charCodeAt(0) - 65 - shift + 26) % 26) + 65;
                result += String.fromCharCode(code);
            } else {
                result += ch;
            }
        }
        return result;
    }

    function displayVigenereSquare(){
        const container=document.getElementById('vigenere-square');
        if(!container) return;
        container.innerHTML='';
        // Add empty corner cell
        const corner=document.createElement('div');
        corner.className='cell header';
        corner.textContent='';
        container.appendChild(corner);
        // Column headers A-Z
        for(let i=0;i<26;i++){
            const cell=document.createElement('div');
            cell.className='cell header';
            cell.textContent=String.fromCharCode(65+i);
            container.appendChild(cell);
        }
        // Rows
        for(let row=0;row<26;row++){
            const rowHeader=document.createElement('div');
            rowHeader.className='cell header index';
            rowHeader.textContent=String.fromCharCode(65+row);
            container.appendChild(rowHeader);
            for(let col=0;col<26;col++){
                const cell=document.createElement('div');
                cell.className='cell';
                cell.textContent=String.fromCharCode(65+((row+col)%26));
                container.appendChild(cell);
            }
        }
    }

    function generateVigenereExplanation(input, output, key, isEncrypt){
        const container=document.getElementById('vigenere-explanation-content');
        if(!container) return;
        const isEnglish=document.body.classList.contains('lang-en');
        let html='';
        const title=isEnglish? (isEncrypt?'Vigenère Encryption Process:':'Vigenère Decryption Process:') : (isEncrypt?'Quá trình mã hóa Vigénère:':'Quá trình giải mã Vigénère:');
        html+=`<div class="step"><strong>${title}</strong></div>`;
        const cleanKey=key.replace(/[^A-Z]/g,'')||'A';
        html+=`<div class="step">${isEnglish? 'Keyword':'Từ khóa'}: <strong>${cleanKey}</strong></div>`;
        const keyStream=generateKeyStream(input.toUpperCase(), cleanKey);
        html+=`<div class="step">${isEnglish? 'Key stream':'Dãy khóa'}: <span class="letter">${keyStream.substr(0, Math.min(20,keyStream.length))}${keyStream.length>20?'...':''}</span></div>`;
        const maxChars=10;
        for(let i=0;i<Math.min(input.length,maxChars);i++){
            const ch=input[i].toUpperCase();
            const k=keyStream[i];
            if(/[A-Z]/.test(ch)){
                const p=ch.charCodeAt(0)-65;
                const s=k.charCodeAt(0)-65;
                const res=output[i]||'';
                const formula=isEncrypt? `((${p}+${s}) mod 26)`:`((${p}-${s}+26) mod 26)`;
                html+=`<div class="step"><span class="letter">${ch}</span> &amp; <span class="letter">${k}</span> → ${formula} → <span class="letter">${res}</span></div>`;
            }else{
                html+=`<div class="step"><span class="letter">${ch}</span> ${isEnglish?'(non-letter kept)':'(giữ nguyên)'}</div>`;
            }
        }
        if(input.length>maxChars){
            html+=`<div class="step">... (${input.length-maxChars} ${isEnglish?'more characters':'ký tự nữa'})</div>`;
        }
        container.innerHTML=html;
    }

    function rotateOuterDisk(degrees){
        degrees=((degrees%360)+360)%360;
        outerDisk.style.transform=`rotate(${degrees}deg)`;
    }
});