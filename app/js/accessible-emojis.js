(function() {
	var renderEmoji = function() {
		var emoji = this;
		return '<a class="composer_emoji_btn" title="' + encodeEntities(emoji.title) + '"><i data-id="' + emoji.id + '" style="width: 30px; height: 30px; display:inline-block;" class="accessible-emoji accessible-emoji-' + emoji.id + '"></i></a>';
	}
	var insertAtCursor = function(text, el) {
		text = ' ' + text;
		var val = el.value, endIndex, startIndex, range;
		if (typeof el.selectionStart != 'undefined' && typeof el.selectionEnd != 'undefined') {
			startIndex = el.selectionStart;
			endIndex = el.selectionEnd;
			el.value = val.substring(0, startIndex) + text + val.substring(el.selectionEnd);
			el.selectionStart = el.selectionEnd = startIndex + text.length;
		} else if (typeof document.selection != 'undefined' && typeof document.selection.createRange != 'undefined') {
			el.focus();
			range = document.selection.createRange();
			range.text = text;
			range.select();
		}
	};


	// FIXME(ecoal95): This is sooo dirty
	//   but the event did get duplicated so...
	var insertText = function(text) {
		console.log("insertText", text);
		if ( ! text.length ) {
			return;
		}
		composer.richTextareaEl.get(0).focus();
		// :setTimeout(composer.onChange.bind(composer), 0);
		console.log(document.execCommand('insertText', false, text));
		// document.querySelector('.composer_rich_textarea').appendChild(document.createTextNode(text));
	}

	var AccessibleEmojis = {
		emojis: [
			{
				title: "Ejemplo: Lápiz",
				action: function() {
					insertText("Ejemplo")
				}
			}
		].map(function(emoji, i) {
			// TODO: Emoji should be a constructible object class
			emoji.id = i;
			emoji.render = renderEmoji;
			return emoji;
		}),
		take: function(n) {
			var emojis = [],
				i;
			for ( i = 0; i < n; ++i ) {
				emojis.push(this.emojis[Math.floor(Math.random() * this.emojis.length)]);
			}

			return emojis;
		},
		get: function(i) {
			return this.emojis[i];
		}
	};

	$(document).on('click', '.accessible-emoji', function(e) {
		AccessibleEmojis.get(parseInt(e.target.getAttribute('data-id'), 10)).action();
		e.preventDefault();
		e.stopPropagation();
	});

	console.log("Accessible emojis definition end");
	window.AccessibleEmojis = AccessibleEmojis;
}());
