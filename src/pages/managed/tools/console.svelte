<script>
  import marked from 'marked';
  import {afterUpdate} from 'svelte';


  export let scoped; scoped;
  export let scopedSync; scopedSync;

  let console_div;
  let outputs_text = "";
  let input_text;
  let cmdHistory = []
  let cursor = -1

  // Output Welcome message
  output('IMX Console')
  output('Welcome to example console program.')

  // User Commands

  let cmds = {
    echo,
    clear,
    help
  }

  function echo (...a) {
    return a.join(' ')
  }
  echo.usage = "echo arg [arg ...]"
  echo.doc = "Echos to output whatever arguments are input"

  function clear () {
    outputs_text = "";
  }
  clear.usage = "clear"
  clear.doc = "Clears the terminal screen"

  function help (cmd) {
    if (cmd) {
      let result = ""
      let usage = cmds[cmd].usage
      let doc = cmds[cmd].doc
      result += (typeof usage === 'function') ? usage() : usage
      result += "\n"
      result += (typeof doc === 'function') ? doc() : doc
      return result
    } else {
      let result = "**Commands:**\n\n"
      print = Object.keys(cmds)
      for (let p of print) {
        result += "- " + p + "\n"
      }
      return result
    }
  }
    
  help.usage = () => "help [command]"
  help.doc = () => "Without an argument, lists available commands. If used with an argument displays the usage & docs for the command."


  function handleKeydown(event) {
    //let key = event.key;
		let keyCode = event.keyCode;
    if(keyCode == 38) {  // UpArrow
      if(cmdHistory.length > 0) {
        cursor = Math.min(++cursor, cmdHistory.length - 1)
        input_text = cmdHistory[cursor];
      }
    } else if (keyCode == 40 ) { // DownArrow
      cursor = Math.max(--cursor, -1)
      if (cursor === -1) {
        // input_text = '';
      } else {
        input_text = cmdHistory[cursor];
      }
    } else if (keyCode == 13 ) { // New-line
      event.preventDefault();
      let line = input_text;
      input_text = '';
      cmdHistory.unshift(line)
      cursor = -1
      let args = getTokens(line)[0]
      //console.log("args", args);
      output('&gt; ' + line);


      let cmd;
      if (args && args.length > 0) cmd = args.shift().value

      args = args.filter(x => x.type !== 'whitespace').map(x => x.value)
      //cmdHistory.unshift(text)
      if (typeof cmds[cmd] === 'function') {
        let result = cmds[cmd](...args)
        if (result === void(0)) {
          // output nothing
        } else if (result instanceof Promise) {
          result.then(output)
        } else {
          //console.log(result)
          output(result)
        }
      } else if (cmd.trim() === '') {
        output('')
      } else {
        output("Command not found: `" + cmd + "`")
        output("Use 'help' for list of commands.")
      }

    }
    //console.log(key, keyCode);
	}
// USER INTERFACE 
  /*
// Set Focus to Input
$('.console').click(function() {
  $('.console-input').focus()
})
   */
  /*
  function handleInput(event) {
    console.log(JSON.stringify(event, undefined, 1));
    //if( event.input ) { //&& event.input.inputType == "insertLineBreak") {
    //  console.log("Input type", event.input.inputType);
    //}
  }*/
  /*
// Display input to Console
function input() {
  var cmd = $('.console-input').val()
  content += "<div class='output-cmd'>" + cmd + "</div>";
  $('.console-input').val("")
  autosize.update($('textarea'))
  $("html, body").animate({
    scrollTop: $(document).height()
  }, 300);
  return cmd
  }*/
   
// Output to Console
function output(print) {
  /*if (!window.md) {
    window.md = window.markdownit({
      linkify: true,
      breaks: true
    })
  }*/
  outputs_text += marked("\n\n" + print);
  //if (console_div && (console_div.scrollHeight > console_div.clientHeight)) {
  //    console.log("Scrolling console_div", console_div.scrollHeight, console_div.clientHeight);
    //console_div.scrollTo(0, console_div.scrollHeight - console_div.clientHeight);
  //}
  //$("#outputs").append(window.md.render(print))  
  //$(".console").scrollTop($('.console-inner').height());
}

  afterUpdate(() => {
    if(console_div) {
      console_div.scrollIntoView({behavior: "smooth", block: "end"});
    }
  });
  /*
// Break Value
var newLine = "<br/> &nbsp;";

autosize($('textarea'))


// Get User Command
$('.console-input').on('keydown', function(event) {
  if (event.which === 38) {
    // Up Arrow
    cursor = Math.min(++cursor, cmdHistory.length - 1)
    $('.console-input').val(cmdHistory[cursor])
  } else if (event.which === 40) {
    // Down Arrow
    cursor = Math.max(--cursor, -1)
    if (cursor === -1) {
      $('.console-input').val('')
    } else {
      $('.console-input').val(cmdHistory[cursor])
    }
  } else if (event.which === 13) {
    event.preventDefault();
    cursor = -1
    let text = input()
    let args = getTokens(text)[0]
    let cmd = args.shift().value
    args = args.filter(x => x.type !== 'whitespace').map(x => x.value)
    cmdHistory.unshift(text)
    if (typeof cmds[cmd] === 'function') {
      let result = cmds[cmd](...args)
      if (result === void(0)) {
        // output nothing
      } else if (result instanceof Promise) {
        result.then(output)
      } else {
        console.log(result)
        output(result)
      }
    } else if (cmd.trim() === '') {
      output('')
    } else {
      output("Command not found: `" + cmd + "`")
      output("Use 'help' for list of commands.")
    }
  }
});
   */
  function getNumber (input) {
    let i = 0
    while (i < input.length && '-.0123456789'.includes(input[i])) {
       i++
    }
    if (i === 0) return [[], input]
    let token = {
        type: 'number',
        value: Number(input.slice(0, i))
    }
    return [[token], input.slice(i)]
}
/*
This getNumber() function takes a string as input, and has two outputs: a token array, and the remaining unused input. We'll see later on why we return an Array of tokens rather than just a single token. Let's see some examples.
*/
// getNumber("123")
// getNumber("1234 6789")
// getNumber(" 12")
/*
The next type we'll add to our parser is strings. Strings are more complicated due to the quoting rules. The opening quote must match the end quote. To keep it simple, we won't deal with escaping characters with backslashes.
*/
function getQuotedString (input) {
    if (input.length === 0) return [[], input]
    let i = 0
    let q = input[i++]
    if (!"'\"".includes(q)) return [[], input]
    while (i < input.length) {
       if (input[i] === q) break
       i++
    }
    let token = {
        type: 'string',
        value: input.slice(1, i)
    }
    return [[token], input.slice(i+1)]
}
// getQuotedString('hello')
// getQuotedString('"hello"')
// getQuotedString("'hello world'")
/*
Most developers wouldn't consider whitespace important, but why treat it any differently? We can parse it too!
*/
function getWhitespace (input) {
    let i = 0
    while (i < input.length && ' \t\n\r'.includes(input[i])) {
       i++
    }
    if (i === 0) return [[], input]
    let token = {
        type: 'whitespace',
        value: input.slice(0, i)
    }
    return [[token], input.slice(i)]
}
// getWhitespace('hello  ')
// getWhitespace(' hello')
// getWhitespace('\thello')
// getWhitespace('   \n   ')
/*
Finally, it is useful sometimes to have unquoted strings. That way we can parse identifiers, like command names, keywords, or constants. We could have stricter rules, like only alpha and underscore, but we'll just do "non-whitespace" and call it a raw string since it wasn't quoted.
*/
function getRawString (input) {
    if (input.length === 0) return [[], input]
    let i = 0
    while (i < input.length && !' \t\n\r'.includes(input[i])) {
       i++
    }
    if (i===0) return [[], input]
    let token = {
        type: 'word',
        value: input.slice(0, i)
    }
    return [[token], input.slice(i)]
}
/*
It's not very useful just grabbing a single token off the front of a string though. That's OK, I've secretly been planning this all along! The finished function combines all our parsers, trying each parser consecutively until the string is consumed. To prevent an infinite loop in case either we or the user made a mistake, we also check that the remaining input gets smaller each loop. If none of the parsers consumed any input and the text remaining isn't getting any smaller, we'll break.
*/
function getTokens (input) {
    let parsers = [getNumber, getQuotedString, getRawString, getWhitespace]
    let result = []
    let t
    let lastsize = Infinity
    while (input.length > 0 && input.length < lastsize) {
        lastsize = input.length
        for (let parser of parsers) {
            [t, input] = parser(input)
            result = [...result, ...t]
        }
    }
    return [result, input]
}

  function autofocus(node) {
    node.focus();
  }


</script>

<div class='console h-100' >
  <div id="console-inner" class='console-inner' bind:this={console_div}>
    <div id="outputs">{@html outputs_text}</div>
    <div class='output-cmd'><textarea on:keydown="{handleKeydown}" use:autofocus class='console-input' placeholder="Type command..."  bind:value={input_text} ></textarea></div>
  </div>
</div>

<style>
  .console {
    /*position: fixed;*/
    font-family: monospace,monospace;
    color: #fff;
    /*width: calc(100% - 3em);*/
    max-width: 100%;
    /*max-height: calc(100% - 3em);*/
    overflow-y: auto;
    /*margin: 1em 1em;*/
    /*padding-top: 0.5em;
    padding-bottom: 0.5em;*/
    background: rgba(0, 0, 0, 0.5);
    border-radius: 0.5em;
    box-shadow: 0 0.75em 3em rgba(50, 50, 50, 0.5);
    z-index: 100;
    line-height: 1;
  }

  .console-input {
    font-family: monospace,monospace;
    background-color: transparent;
    border: none;
    outline: none;
    color: #fff;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    min-width: calc(100% - 2em);
    resize: none;
  }

  .console-input:before {
    content: '> ';
    color: #FC3565;
    vertical-align: top;
  }

  .output-cmd:before {
    content: '> ';
    color: #FC3565;
    vertical-align: top;
  }

.console-inner {
  padding: 0.3em 1.1em;
}

#outputs div div {
  color: #46f01d;
  opacity: 0.8;
  text-decoration: none;
}

  /*
.output-text:before {
  content: '> ';
  color: #5F8787;
  font-weight: 600 !important;
  vertical-align: top;
}

.output-text, .output-cmd {
  width: 100%;
  display: block;
}

.output-text, .output-cmd {
  display: block;
  white-space: pre;
}

#outputs div {
  opacity: 0.85;
}

#outputs a {
  color: #46f01d;
  opacity: 0.8;
  text-decoration: underline;
}

.console-inner .output-text#ready {
  color: #3df5b8;
  font-style: italic;
  opacity: 0.75;
}
  */
</style>
