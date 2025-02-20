
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        document.getElementById(targetId).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
document.addEventListener("DOMContentLoaded", function() {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("show");
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const consoleOutput = document.getElementById('console-output');
    const content = document.getElementById('content');

    const commands = [
        { immediate: 'awdevsoftware.org@125.123.32.23:~$ ', type: 'node webserver.js\n\n' },
        ' * Serving ExpressJS app "web portfolio"\n',
        ' * Running on http://0.0.0.0:3000/ (Press CTRL+C to quit)\n',
        ' * Cloudflared: Port Forwarding to the interwebz from\n',
        ' * https://0.0.0.0:3000 <--> https://awdevsoftware.org\n',
        '.........\n\n',
        'Done!'
    ];

    let commandIndex = 0;
    let cursor = document.createElement('span');
    cursor.className = 'cursor';
    consoleOutput.appendChild(cursor);

    function moveCursor() {
        consoleOutput.appendChild(cursor);
    }

    function typeEffectCharacterByCharacter(text, callback) {
        let i = 0;
        const interval = setInterval(() => {
            const char = text.charAt(i);
            if (char !== '\n') {
                cursor.before(document.createTextNode(char));
            } else {
                cursor.before(document.createElement('br'));
            }
            moveCursor();
            i++;
            if (i >= text.length) {
                clearInterval(interval);
                if (callback) callback();
            }
        }, 85);
    }

    function typeEffectLineByLine(text, callback) {
        const lines = text.split('\n');
        lines.forEach((line) => {
            const span = document.createElement('span');
            span.textContent = line;
            consoleOutput.insertBefore(span, cursor);
            consoleOutput.appendChild(document.createElement('br'));
        });
        moveCursor();
        if (callback) callback();
    }

    function typeNextCommand() {
        if (commandIndex < commands.length) {
            if (commandIndex === 0) {
                const { immediate, type } = commands[commandIndex];

                const promptSpan = document.createElement('span');
                promptSpan.style.display = "inline"; 
                promptSpan.textContent = immediate;
                consoleOutput.insertBefore(promptSpan, cursor);

                typeEffectCharacterByCharacter(type, () => {
                    commandIndex++;
                    setTimeout(typeNextCommand, 500);
                });
            } else {
                typeEffectLineByLine(commands[commandIndex], () => {
                    if (commands[commandIndex] === '.........\n\n') {
                        setTimeout(() => {
                            commandIndex++;
                            typeNextCommand();
                        }, 3000);
                    } else {
                        commandIndex++;
                        setTimeout(typeNextCommand, 1000);
                    }
                });
            }
        } else {
            setTimeout(() => {
                document.getElementById('console').style.display = 'none';
                content.classList.remove('hidden');
            }, 100);
        }
    }

    typeNextCommand();
});
document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll(".fade-in");
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.2 });
    sections.forEach(section => observer.observe(section));
});