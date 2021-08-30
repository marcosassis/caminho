function tagWrap(_tag, _class, _attributes, _content) {
    return `<${_tag}${_class ? ` class="${_class}"` : ""} ${_attributes}>${_content}</${_tag}>`;
}

function linkWrap(_class, _href, _content, newTab = true) {
    return tagWrap("a", _class,
        `href="${_href}" ${newTab ? `target="_blank" rel="noopener noreferrer"` : ""}`, _content);
}

function adHocSyntaxHighlight_código(text) {
    return text
        .replace(/\</g, "&lt;")
        .replace(/"(.*?)"/g, '"' + tagWrap("span", "syntax-string", "", "$1") + '"')
        .replace(/ d="([^"]*)"/g, p1 => {
            commands = p1.split`\n`;
            for (i = 1; i < commands.length; ++i) {
                commands[i] =
                    commands[i].slice(0, 24) +
                    tagWrap("span", "syntax-command", "", commands[i].slice(24, 25)) +
                    tagWrap("span", "syntax-string", "", commands[i].slice(25, 42)) +
                    tagWrap("span", "syntax-delta", "", commands[i].slice(42, 56)) +
                    commands[i].slice(56);
            }
            return commands.join`\n`;
        })
        .replace(/&lt;(\/|)svg(>|)/g,
            linkWrap("", "manual.html", "$&"))
        .replace(/&lt;(\/|)(svg|circle|g|path)/g, `&lt;$1` + tagWrap("span", "syntax-tag", "", "$2"))
        .replace(/&lt;!--([^-->]*)-->/g, tagWrap("span", "syntax-comment", "", "$&"));
}