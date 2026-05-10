// =============================================
// HTML LEARNING MODULES DATA
// =============================================

const modulesData = [
    {
        id: 1,
        title: "What Is HTML?",
        description: "Learn what HTML is and how it structures a webpage.",
        content: `
            <h3>What is HTML?</h3>
            <p><strong>HTML</strong> (HyperText Markup Language) is the standard language for creating web pages. It uses elements called "tags" to describe the structure and content of a page. Most tags come in pairs—an opening tag and a closing tag:</p>
            
            <div class="code-block">
                <pre><code>&lt;p&gt;This is a paragraph.&lt;/p&gt;</code></pre>
            </div>
            
            <h3>The Basic HTML Boilerplate</h3>
            <p>Every HTML document follows a standard structure. Here is the basic boilerplate:</p>
            
            <div class="code-block">
                <pre><code>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
  &lt;head&gt;
    &lt;meta charset="UTF-8" /&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0" /&gt;
    &lt;title&gt;My First Page&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;h1&gt;Hello World&lt;/h1&gt;
    &lt;p&gt;This is my first webpage.&lt;/p&gt;
  &lt;/body&gt;
&lt;/html&gt;</code></pre>
            </div>
            
            <p>The <span class="inline-code">&lt;!DOCTYPE html&gt;</span> declaration tells the browser this is an HTML5 document. The <span class="inline-code">&lt;html&gt;</span> element is the root of the page. Inside it, the <span class="inline-code">&lt;head&gt;</span> contains metadata like the page title and character encoding, while the <span class="inline-code">&lt;body&gt;</span> contains all the visible content.</p>
            
            <p>The <span class="inline-code">&lt;meta charset="UTF-8" /&gt;</span> tag ensures the browser correctly renders text from different languages, including special characters and emojis.</p>
        `,
        quiz: {
            questions: [
                {
                    question: "What does HTML stand for?",
                    options: ["Hyper Transfer Markup Language", "HyperText Markup Language", "High Tech Modern Language", "Hyper Tool Markup Language"],
                    correct: 1,
                    explanation: "Answer: <strong>HyperText Markup Language</strong>"
                },
                {
                    question: "What is the purpose of the &lt;body&gt; tag?",
                    options: ["It links to external stylesheets", "It contains metadata about the page", "It contains all the visible content of the webpage", "It defines the document type"],
                    correct: 2,
                    explanation: "Answer: <strong>It contains all the visible content of the webpage</strong>"
                },
                {
                    question: "Where should the &lt;title&gt; element be placed?",
                    options: ["Inside the &lt;body&gt; element", "At the very end of the document", "Inside the &lt;head&gt; element", "Before the &lt;!DOCTYPE html&gt; declaration"],
                    correct: 2,
                    explanation: "Answer: <strong>Inside the &lt;head&gt; element</strong>"
                },
                {
                    question: "What does the &lt;meta charset=\"UTF-8\" /&gt; tag do?",
                    options: ["It sets the background color of the page", "It ensures correct rendering of text in different languages", "It links to an external JavaScript file", "It creates a favicon for the browser tab"],
                    correct: 1,
                    explanation: "Answer: <strong>It ensures correct rendering of text in different languages</strong>"
                },
                {
                    question: "True or False: HTML tags are case-sensitive, meaning &lt;P&gt; is different from &lt;p&gt;.",
                    options: ["True", "False"],
                    correct: 1,
                    explanation: "Answer: <strong>False</strong>"
                },
                {
                    question: "Which of these is the correct way to write a paragraph in HTML?",
                    options: ["&lt;paragraph&gt;Hello&lt;/paragraph&gt;", "&lt;p&gt;Hello&lt;/p&gt;", "&lt;P&gt;Hello", "&lt;par&gt;Hello&lt;/par&gt;"],
                    correct: 1,
                    explanation: "Answer: <strong>&lt;p&gt;Hello&lt;/p&gt;</strong>"
                }
            ]
        }
    },
    {
        id: 2,
        title: "Text, Links, and Lists",
        description: "Learn about the core tags for organizing written content.",
        content: `
            <h3>Text and Headings</h3>
            <p>Headings range from <span class="inline-code">&lt;h1&gt;</span> (most important) to <span class="inline-code">&lt;h6&gt;</span> (least important). They create a hierarchy that helps both users and search engines understand your content structure.</p>
            
            <h3>Links (Anchor Tags)</h3>
            <p>Links are created using the anchor (<span class="inline-code">&lt;a&gt;</span>) element. The <span class="inline-code">href</span> attribute specifies the destination URL:</p>
            
            <div class="code-block">
                <pre><code>&lt;a href="https://www.example.com"&gt;Visit Example&lt;/a&gt;</code></pre>
            </div>
            
            <h3>Creating Lists</h3>
            <p>HTML supports two main types of lists. Unordered lists (<span class="inline-code">&lt;ul&gt;</span>) use bullet points, while ordered lists (<span class="inline-code">&lt;ol&gt;</span>) use numbers:</p>
            
            <div class="code-block">
                <pre><code>&lt;ul&gt;
  &lt;li&gt;Apples&lt;/li&gt;
  &lt;li&gt;Bananas&lt;/li&gt;
  &lt;li&gt;Cherries&lt;/li&gt;
&lt;/ul&gt;

&lt;ol&gt;
  &lt;li&gt;First step&lt;/li&gt;
  &lt;li&gt;Second step&lt;/li&gt;
  &lt;li&gt;Third step&lt;/li&gt;
&lt;/ol&gt;</code></pre>
            </div>
            
            <h3>The target Attribute</h3>
            <p>The <span class="inline-code">target</span> attribute on a link controls where the linked page opens. Using <span class="inline-code">target="_blank"</span> opens the link in a new browser tab:</p>
            
            <div class="code-block">
                <pre><code>&lt;a href="https://example.com/" target="_blank"&gt;Open in new tab&lt;/a&gt;</code></pre>
            </div>
        `,
        quiz: {
            questions: [
                {
                    question: "What tag creates a hyperlink in HTML?",
                    options: ["&lt;link&gt;", "&lt;href&gt;", "&lt;a&gt;", "&lt;url&gt;"],
                    correct: 2,
                    explanation: "Answer: <strong>&lt;a&gt;</strong>"
                },
                {
                    question: "Which attribute specifies the destination of a hyperlink?",
                    options: ["src", "href", "url", "link"],
                    correct: 1,
                    explanation: "Answer: <strong>href</strong>"
                },
                {
                    question: "How many heading levels are available in HTML?",
                    options: ["4", "5", "6", "7"],
                    correct: 2,
                    explanation: "Answer: <strong>6</strong>"
                },
                {
                    question: "What does &lt;li&gt; stand for?",
                    options: ["Link Item", "List Item", "Line Indicator", "Label Instance"],
                    correct: 1,
                    explanation: "Answer: <strong>List Item</strong>"
                },
                {
                    question: "Which tag wraps an ordered (numbered) list?",
                    options: ["&lt;ul&gt;", "&lt;li&gt;", "&lt;ol&gt;", "&lt;list&gt;"],
                    correct: 2,
                    explanation: "Answer: <strong>&lt;ol&gt;</strong>"
                },
                {
                    question: "What does adding target=\"_blank\" to a link do?",
                    options: ["It makes the link bold", "It opens the link in the same tab", "It opens the link in a new browser tab", "It validates the link URL"],
                    correct: 2,
                    explanation: "Answer: <strong>It opens the link in a new browser tab</strong>"
                }
            ]
        }
    },
    {
        id: 3,
        title: "Images and Semantic Layout",
        description: "Learn how to add images and structure pages with semantic elements.",
        content: `
            <h3>The &lt;img&gt; Element</h3>
            <p>The <span class="inline-code">&lt;img&gt;</span> element embeds images into a webpage. It is a self-closing tag, meaning it doesn't require a closing tag. The <span class="inline-code">src</span> attribute specifies the image file location, while the <span class="inline-code">alt</span> attribute provides a text description for accessibility and situations where the image cannot load:</p>
            
            <div class="code-block">
                <pre><code>&lt;img src="cat.jpg" alt="A fluffy orange cat sleeping on a couch" /&gt;</code></pre>
            </div>
            
            <h3>Semantic HTML Elements</h3>
            <p>Semantic elements clearly describe their meaning to both the browser and the developer. Instead of using generic <span class="inline-code">&lt;div&gt;</span> tags everywhere, semantic tags give purpose to your content:</p>
            
            <div class="code-block">
                <pre><code>&lt;header&gt;
  &lt;h1&gt;My Website&lt;/h1&gt;
  &lt;nav&gt;
    &lt;a href="/"&gt;Home&lt;/a&gt;
    &lt;a href="/about"&gt;About&lt;/a&gt;
    &lt;a href="/contact"&gt;Contact&lt;/a&gt;
  &lt;/nav&gt;
&lt;/header&gt;

&lt;main&gt;
  &lt;section&gt;
    &lt;h2&gt;Introduction&lt;/h2&gt;
    &lt;p&gt;Welcome to my website.&lt;/p&gt;
  &lt;/section&gt;
&lt;/main&gt;

&lt;footer&gt;
  &lt;p&gt;&amp;copy; 2024 My Website. All rights reserved.&lt;/p&gt;
&lt;/footer&gt;</code></pre>
            </div>
            
            <p>The <span class="inline-code">&lt;header&gt;</span> typically contains introductory content and navigation. The <span class="inline-code">&lt;nav&gt;</span> element wraps major navigation links. The <span class="inline-code">&lt;main&gt;</span> element holds the unique content of the page. The <span class="inline-code">&lt;footer&gt;</span> usually contains copyright information, contact details, and secondary links.</p>
            
            <p>Using semantic elements improves accessibility for screen readers and helps search engines understand your content better, which is crucial for SEO.</p>
        `,
        quiz: {
            questions: [
                {
                    question: "Why is the alt attribute on an &lt;img&gt; tag important?",
                    options: ["It makes the image load faster", "It provides a text description for accessibility and image loading failures", "It changes the image's border style", "It specifies the image file format"],
                    correct: 1,
                    explanation: "Answer: <strong>It provides a text description for accessibility and image loading failures</strong>"
                },
                {
                    question: "Which of these is a self-closing tag?",
                    options: ["&lt;div&gt;", "&lt;p&gt;", "&lt;img&gt;", "&lt;a&gt;"],
                    correct: 2,
                    explanation: "Answer: <strong>&lt;img&gt;</strong>"
                },
                {
                    question: "What is the semantic tag for the main navigation block of a page?",
                    options: ["&lt;header&gt;", "&lt;main&gt;", "&lt;nav&gt;", "&lt;footer&gt;"],
                    correct: 2,
                    explanation: "Answer: <strong>&lt;nav&gt;</strong>"
                },
                {
                    question: "Which tag should contain the core, unique content of a page?",
                    options: ["&lt;header&gt;", "&lt;section&gt;", "&lt;div&gt;", "&lt;main&gt;"],
                    correct: 3,
                    explanation: "Answer: <strong>&lt;main&gt;</strong>"
                },
                {
                    question: "Name two semantic tags that are more descriptive than &lt;div&gt;.",
                    options: ["&lt;span&gt; and &lt;br&gt;", "&lt;section&gt; and &lt;article&gt;", "&lt;input&gt; and &lt;form&gt;", "&lt;head&gt; and &lt;body&gt;"],
                    correct: 1,
                    explanation: "Answer: <strong>&lt;section&gt; and &lt;article&gt;</strong>"
                },
                {
                    question: "What element is typically found at the very bottom of a page containing copyright information?",
                    options: ["&lt;header&gt;", "&lt;nav&gt;", "&lt;main&gt;", "&lt;footer&gt;"],
                    correct: 3,
                    explanation: "Answer: <strong>&lt;footer&gt;</strong>"
                }
            ]
        }
    },
    {
        id: 4,
        title: "Forms and Input Elements",
        description: "Let's learn how to collect data from users using HTML forms.",
        content: `
            <h3>The &lt;form&gt; Element</h3>
            <p>Forms are essential for user interaction. The <span class="inline-code">&lt;form&gt;</span> element wraps all input fields and specifies where the data should be sent. The <span class="inline-code">action</span> attribute defines the URL that processes the form data, and the <span class="inline-code">method</span> attribute specifies how the data is sent:</p>
            
            <div class="code-block">
                <pre><code>&lt;form action="/submit" method="post"&gt;
  &lt;!-- Input elements go here --&gt;
&lt;/form&gt;</code></pre>
            </div>
            
            <h3>Common Input Types</h3>
            <p>Different input types serve different purposes. Here are some of the most common ones:</p>
            
            <div class="code-block">
                <pre><code>&lt;form action="/signup" method="post"&gt;
  &lt;label for="name"&gt;Full Name:&lt;/label&gt;
  &lt;input type="text" id="name" name="name" placeholder="Enter your name" /&gt;
 
  &lt;label for="email"&gt;Email:&lt;/label&gt;
  &lt;input type="email" id="email" name="email" placeholder="you@example.com" /&gt;
 
  &lt;label for="password"&gt;Password:&lt;/label&gt;
  &lt;input type="password" id="password" name="password" /&gt;
 
  &lt;label for="message"&gt;Message:&lt;/label&gt;
  &lt;textarea id="message" name="message" rows="4" cols="50"&gt;&lt;/textarea&gt;
 
  &lt;input type="submit" value="Submit" /&gt;
&lt;/form&gt;</code></pre>
            </div>
            
            <p>The <span class="inline-code">&lt;label&gt;</span> element is crucial for accessibility. Clicking a label focuses its associated input when the <span class="inline-code">for</span> attribute matches the input's <span class="inline-code">id</span>. The <span class="inline-code">placeholder</span> attribute provides a hint to the user about what to enter.</p>
            
            <p>The <span class="inline-code">type="submit"</span> creates a button that submits the form. Other useful input types include <span class="inline-code">type="checkbox"</span> for multiple selections, <span class="inline-code">type="radio"</span> for single selections in a group, and <span class="inline-code">type="number"</span> for numeric input with built-in validation.</p>
        `,
        quiz: {
            questions: [
                {
                    question: "What tag creates a text input field?",
                    options: ["&lt;text&gt;", "&lt;field&gt;", "&lt;input&gt;", "&lt;textbox&gt;"],
                    correct: 2,
                    explanation: "Answer: <strong>&lt;input&gt;</strong>"
                },
                {
                    question: "How do you create a password field where characters are hidden?",
                    options: ["&lt;input type=\"hidden\"&gt;", "&lt;input type=\"secure\"&gt;", "&lt;input type=\"password\"&gt;", "&lt;input type=\"text\" secure&gt;"],
                    correct: 2,
                    explanation: "Answer: <strong>&lt;input type=\"password\"&gt;</strong>"
                },
                {
                    question: "What attribute links a &lt;label&gt; to a specific &lt;input&gt;?",
                    options: ["name", "id", "for", "link"],
                    correct: 2,
                    explanation: "Answer: <strong>for</strong>"
                },
                {
                    question: "What is the purpose of the action attribute on a &lt;form&gt;?",
                    options: ["It specifies the form's background color", "It defines the HTTP method to use", "It specifies the URL where form data is sent", "It determines which input is focused first"],
                    correct: 2,
                    explanation: "Answer: <strong>It specifies the URL where form data is sent</strong>"
                },
                {
                    question: "Which tag creates a multi-line text input area?",
                    options: ["&lt;input type=\"multiline\"&gt;", "&lt;textbox&gt;", "&lt;textarea&gt;", "&lt;input type=\"text\" rows=\"5\"&gt;"],
                    correct: 2,
                    explanation: "Answer: <strong>&lt;textarea&gt;</strong>"
                },
                {
                    question: "What input type is best suited for an email address?",
                    options: ["type=\"text\"", "type=\"string\"", "type=\"address\"", "type=\"email\""],
                    correct: 3,
                    explanation: "Answer: <strong>type=\"email\"</strong>"
                }
            ]
        }
    },
    {
        id: 5,
        title: "CSS Fundamentals",
        description: "Let's learn what CSS is and how to apply styles to HTML elements.",
        content: `
            <h3>What is CSS?</h3>
            <p><strong>CSS</strong> (Cascading Style Sheets) controls the visual presentation of web pages. A CSS rule consists of a selector and a declaration block. The selector targets the HTML element, and the declaration block contains one or more property-value pairs:</p>
            
            <div class="code-block">
                <pre><code>p {
  color: blue;
  font-size: 16px;
}</code></pre>
            </div>
            
            <h3>Ways to Add CSS to HTML</h3>
            <p>There are three methods to apply CSS. The recommended approach is using an external stylesheet.</p>
            
            <p><strong>Inline (avoid when possible):</strong></p>
            <div class="code-block">
                <pre><code>&lt;p style="color: red;"&gt;This text is red.&lt;/p&gt;</code></pre>
            </div>
            
            <p><strong>Internal (within the &lt;head&gt;):</strong></p>
            <div class="code-block">
                <pre><code>&lt;head&gt;
  &lt;style&gt;
    p {
      color: blue;
    }
  &lt;/style&gt;
&lt;/head&gt;</code></pre>
            </div>
            
            <p><strong>External (best practice):</strong></p>
            <div class="code-block">
                <pre><code>&lt;head&gt;
  &lt;link rel="stylesheet" href="./styles.css" /&gt;
&lt;/head&gt;</code></pre>
            </div>
            
            <p>The <span class="inline-code">rel</span> attribute specifies the relationship between the linked resource and the HTML document—in this case, <strong>stylesheet</strong>. The <span class="inline-code">href</span> attribute points to the location of the CSS file. The <span class="inline-code">./</span> in the path tells the computer to look in the current folder or directory for the styles.css file.</p>
            
            <p>Separating HTML and CSS into different files is considered best practice because it keeps your code organized, makes maintenance easier, and allows the same stylesheet to be used across multiple pages.</p>
        `,
        quiz: {
            questions: [
                {
                    question: "What does CSS stand for?",
                    options: ["Computer Style System", "Cascading Style Sheets", "Creative Styling Syntax", "Colorful Screen Styles"],
                    correct: 1,
                    explanation: "Answer: <strong>Cascading Style Sheets</strong>"
                },
                {
                    question: "In the rule h1 { color: green; }, what is h1 called?",
                    options: ["The property", "The value", "The declaration", "The selector"],
                    correct: 3,
                    explanation: "Answer: <strong>The selector</strong>"
                },
                {
                    question: "Which method of adding CSS is considered best practice for large projects?",
                    options: ["Inline styling", "Internal stylesheet", "External stylesheet", "Embedded styling"],
                    correct: 2,
                    explanation: "Answer: <strong>External stylesheet</strong>"
                },
                {
                    question: "What does the rel attribute in a &lt;link&gt; element specify?",
                    options: ["The size of the linked file", "The language of the linked resource", "The relationship between the linked resource and the HTML document", "The rendering speed of the linked resource"],
                    correct: 2,
                    explanation: "Answer: <strong>The relationship between the linked resource and the HTML document</strong>"
                },
                {
                    question: "Why is inline styling generally discouraged?",
                    options: ["It loads slower than external stylesheets", "It makes code harder to maintain and mixes structure with presentation", "It only works with certain browsers", "It doesn't support all CSS properties"],
                    correct: 1,
                    explanation: "Answer: <strong>It makes code harder to maintain and mixes structure with presentation</strong>"
                },
                {
                    question: "Which part of font-size: 20px; is the property?",
                    options: ["20px", "font-size", "The semicolon", "The colon"],
                    correct: 1,
                    explanation: "Answer: <strong>font-size</strong>"
                }
            ]
        }
    },
    {
        id: 6,
        title: "Selectors and the Box Model",
        description: "Let's learn how to target specific elements and understand how spacing works.",
        content: `
            <h3>CSS Selectors</h3>
            <p>CSS selectors let you choose which elements to style. The three fundamental selectors target elements by their tag name, class, or ID:</p>
            
            <div class="code-block">
                <pre><code>/* Element selector - targets all <p> tags */
p {
  line-height: 1.5;
}
 
/* Class selector - targets elements with class="highlight" */
.highlight {
  background-color: yellow;
}
 
/* ID selector - targets the element with id="main-title" */
#main-title {
  font-size: 32px;
}</code></pre>
            </div>
            
            <h3>Understanding the Box Model</h3>
            <p>Every HTML element is a rectangular box. The box model consists of four parts, from inside to outside:</p>
            <ul>
                <li><strong>Content:</strong> The actual text or image inside the element</li>
                <li><strong>Padding:</strong> The space between the content and the border (inside the box)</li>
                <li><strong>Border:</strong> The edge surrounding the padding and content</li>
                <li><strong>Margin:</strong> The space outside the border that separates elements from each other</li>
            </ul>
            
            <div class="code-block">
                <pre><code>.box {
  width: 200px;
  padding: 20px;
  border: 2px solid black;
  margin: 30px;
}</code></pre>
            </div>
            
            <p>An important principle: multiple elements can share the same class (use a class when you want to style multiple things the same way), but an id must be unique on the page (use an ID for a single, specific element).</p>
            
            <p>A useful trick for layout calculations is setting <span class="inline-code">box-sizing: border-box;</span>, which makes the width and height properties include the padding and border, rather than adding them on top.</p>
        `,
        quiz: {
            questions: [
                {
                    question: "Which CSS selector targets an element with class=\"highlight\"?",
                    options: ["#highlight", "highlight", ".highlight", "*highlight"],
                    correct: 2,
                    explanation: "Answer: <strong>.highlight</strong>"
                },
                {
                    question: "Which selector targets an element with id=\"logo\"?",
                    options: [".logo", "#logo", "logo", "&logo"],
                    correct: 1,
                    explanation: "Answer: <strong>#logo</strong>"
                },
                {
                    question: "What is the difference between padding and margin?",
                    options: ["Padding is outside the border, margin is inside", "Padding is inside the border, margin is outside the border", "There is no difference", "Padding is for text only, margin is for images only"],
                    correct: 1,
                    explanation: "Answer: <strong>Padding is inside the border, margin is outside the border</strong>"
                },
                {
                    question: "True or False: Multiple elements can share the same class.",
                    options: ["True", "False"],
                    correct: 0,
                    explanation: "Answer: <strong>True</strong>"
                },
                {
                    question: "True or False: Multiple elements can share the same id.",
                    options: ["True", "False"],
                    correct: 1,
                    explanation: "Answer: <strong>False</strong>"
                },
                {
                    question: "What does the box-sizing: border-box; property do?",
                    options: ["It removes all borders from the element", "It makes width and height include padding and border", "It centers the element horizontally", "It adds a shadow around the box"],
                    correct: 1,
                    explanation: "Answer: <strong>It makes width and height include padding and border</strong>"
                }
            ]
        }
    },
    {
        id: 7,
        title: "Layout with Flexbox",
        description: "Let's learn how to arrange elements using the Flexbox layout system.",
        content: `
            <h3>What is Flexbox?</h3>
            <p><strong>Flexbox</strong> (Flexible Box Layout) is a one-dimensional layout method for arranging items in rows or columns. To use it, apply <span class="inline-code">display: flex;</span> to a parent container. This parent becomes a "flex container," and its direct children become "flex items":</p>
            
            <div class="code-block">
                <pre><code>.container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}</code></pre>
            </div>
            
            <h3>Key Flexbox Properties</h3>
            <p><strong>On the container:</strong></p>
            <ul>
                <li><strong>flex-direction:</strong> Defines the main axis—row (default, horizontal) or column (vertical)</li>
                <li><strong>justify-content:</strong> Aligns items along the main axis—options include flex-start, center, space-between, space-around, and space-evenly</li>
                <li><strong>align-items:</strong> Aligns items along the cross axis (perpendicular)—options include stretch, flex-start, center, and flex-end</li>
            </ul>
            
            <div class="code-block">
                <pre><code>.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #333;
  color: white;
}</code></pre>
            </div>
            
            <p>This creates a navigation bar where the logo and menu items are evenly spaced horizontally and centered vertically.</p>
            
            <p><strong>Space-between vs. Space-around:</strong> <span class="inline-code">space-between</span> places the first item at the start and the last item at the end, with equal space between items. <span class="inline-code">space-around</span> places equal space around each item, which means the space at the edges is half the space between items.</p>
            
            <p>For vertical centering, the container needs a defined height. Without it, <span class="inline-code">align-items: center</span> has no visible effect since the container's height matches its content.</p>
        `,
        quiz: {
            questions: [
                {
                    question: "What CSS property activates Flexbox on a container?",
                    options: ["flex: true;", "layout: flex;", "display: flex;", "flexbox: on;"],
                    correct: 2,
                    explanation: "Answer: <strong>display: flex;</strong>"
                },
                {
                    question: "Which property controls alignment along the main axis?",
                    options: ["align-items", "flex-direction", "justify-content", "flex-wrap"],
                    correct: 2,
                    explanation: "Answer: <strong>justify-content</strong>"
                },
                {
                    question: "Which property controls alignment along the cross axis?",
                    options: ["justify-content", "align-items", "flex-direction", "flex-basis"],
                    correct: 1,
                    explanation: "Answer: <strong>align-items</strong>"
                },
                {
                    question: "What value of justify-content places equal space between items with no space at the edges?",
                    options: ["space-around", "space-evenly", "center", "space-between"],
                    correct: 3,
                    explanation: "Answer: <strong>space-between</strong>"
                },
                {
                    question: "To stack flex items vertically, what value should flex-direction have?",
                    options: ["row", "horizontal", "vertical", "column"],
                    correct: 3,
                    explanation: "Answer: <strong>column</strong>"
                },
                {
                    question: "What does align-items: center do to items in a row layout?",
                    options: ["It centers items horizontally", "It centers items vertically within the container", "It adds padding to all items", "It spaces items evenly"],
                    correct: 1,
                    explanation: "Answer: <strong>It centers items vertically within the container</strong>"
                }
            ]
        }
    },
    {
        id: 8,
        title: "JavaScript Basics and the DOM",
        description: "Let's learn how JavaScript interacts with HTML through the Document Object Model.",
        content: `
            <h3>What is the DOM?</h3>
            <p>The <strong>DOM</strong> (Document Object Model) is a programming interface that represents the structure of an HTML document as a tree of objects. JavaScript can access and manipulate these objects to change the content, structure, and style of a webpage dynamically:</p>
            
            <div class="code-block">
                <pre><code>let heading = document.getElementById("main-title");
heading.style.color = "orange";</code></pre>
            </div>
            
            <h3>Variables and Selecting Elements</h3>
            <p>Variables store data for later use. Use <span class="inline-code">let</span> for values that will change and <span class="inline-code">const</span> for values that stay constant:</p>
            
            <div class="code-block">
                <pre><code>let score = 0; // Can be reassigned later
const playerName = "Alice"; // Cannot be reassigned</code></pre>
            </div>
            
            <p>JavaScript provides several methods to select HTML elements:</p>
            
            <div class="code-block">
                <pre><code>// Select by ID
let element = document.getElementById("unique-id");
 
// Select the first match using a CSS selector
let box = document.querySelector(".box");
 
// Select all matches
let allBoxes = document.querySelectorAll(".box");</code></pre>
            </div>
            
            <p>The <span class="inline-code">innerHTML</span> property allows you to read or change the HTML content inside an element:</p>
            
            <div class="code-block">
                <pre><code>let paragraph = document.getElementById("demo");
paragraph.innerHTML = "New content!"; // Changes what's displayed</code></pre>
            </div>
            
            <p><span class="inline-code">querySelector</span> is versatile because it accepts any valid CSS selector, including complex ones like <span class="inline-code">".container > p:first-child"</span>. <span class="inline-code">querySelectorAll</span> returns a NodeList similar to an array, which you can loop through.</p>
        `,
        quiz: {
            questions: [
                {
                    question: "What does DOM stand for?",
                    options: ["Digital Object Manager", "Document Object Model", "Display Orientation Module", "Data Output Method"],
                    correct: 1,
                    explanation: "Answer: <strong>Document Object Model</strong>"
                },
                {
                    question: "What method finds an element by its ID?",
                    options: ["document.querySelector()", "document.getElementByClass()", "document.getElementById()", "document.getElementsByName()"],
                    correct: 2,
                    explanation: "Answer: <strong>document.getElementById()</strong>"
                },
                {
                    question: "What keyword declares a variable that cannot be reassigned?",
                    options: ["let", "var", "const", "static"],
                    correct: 2,
                    explanation: "Answer: <strong>const</strong>"
                },
                {
                    question: "How do you select the first element with a CSS class \"box\" using querySelector?",
                    options: ["document.querySelector(\"#box\")", "document.querySelector(\"box\")", "document.querySelector(\".box\")", "document.querySelector(\"*box\")"],
                    correct: 2,
                    explanation: "Answer: <strong>document.querySelector(\".box\")</strong>"
                },
                {
                    question: "What does document.getElementById(\"demo\").innerHTML = \"Hi\"; do?",
                    options: ["It creates a new element with id \"demo\"", "It changes the HTML content of the element with id \"demo\" to \"Hi\"", "It deletes the element with id \"demo\"", "It applies a CSS style to the element"],
                    correct: 1,
                    explanation: "Answer: <strong>It changes the HTML content of the element with id \"demo\" to \"Hi\"</strong>"
                },
                {
                    question: "What is the difference between let and const?",
                    options: ["let is for numbers, const is for strings", "let can be reassigned, const cannot be reassigned", "There is no difference", "const is faster than let"],
                    correct: 1,
                    explanation: "Answer: <strong>let can be reassigned, const cannot be reassigned</strong>"
                }
            ]
        }
    },
    {
        id: 9,
        title: "Functions and Events",
        description: "Let's learn how to create reusable code blocks and respond to user interactions.",
        content: `
            <h3>Functions</h3>
            <p>Functions are reusable blocks of code that perform a specific task. They help avoid repetition and make code more organized:</p>
            
            <div class="code-block">
                <pre><code>function greetUser(name) {
  return "Hello, " + name + "!";
}

let message = greetUser("Sarah");
console.log(message); // Output: "Hello, Sarah!"</code></pre>
            </div>
            
            <h3>Responding to Events</h3>
            <p>Events are actions that occur in the browser, like clicks, keyboard presses, or page loads. The <span class="inline-code">addEventListener</span> method attaches a function to an element's event:</p>
            
            <div class="code-block">
                <pre><code>&lt;button id="my-button"&gt;Click Me&lt;/button&gt;
 
let button = document.getElementById("my-button");
 
button.addEventListener("click", function() {
  alert("Button was clicked!");
});</code></pre>
            </div>
            
            <p>This approach—using <span class="inline-code">addEventListener</span>—is preferred over inline event handlers (<span class="inline-code">onclick="..."</span> in HTML) because it keeps JavaScript separate from HTML and allows multiple listeners on the same event.</p>
            
            <p>Common event types include:</p>
            <ul>
                <li><strong>click:</strong> User clicks an element</li>
                <li><strong>mouseover:</strong> Mouse enters an element</li>
                <li><strong>keydown:</strong> User presses a keyboard key</li>
                <li><strong>submit:</strong> A form is submitted</li>
                <li><strong>load:</strong> The page finishes loading</li>
            </ul>
            
            <p>Functions can also be declared independently and referenced by name:</p>
            
            <div class="code-block">
                <pre><code>function handleClick() {
  console.log("Clicked!");
}
 
button.addEventListener("click", handleClick);
// Note: no parentheses after handleClick—we're referencing the function, not calling it immediately</code></pre>
            </div>
        `,
        quiz: {
            questions: [
                {
                    question: "What is the purpose of a function in JavaScript?",
                    options: ["To style HTML elements", "To create a reusable block of code that performs a specific task", "To link external stylesheets", "To define the page layout"],
                    correct: 1,
                    explanation: "Answer: <strong>To create a reusable block of code that performs a specific task</strong>"
                },
                {
                    question: "What method attaches an event listener to an element?",
                    options: ["onClick()", "attachEvent()", "addEventListener()", "listenFor()"],
                    correct: 2,
                    explanation: "Answer: <strong>addEventListener()</strong>"
                },
                {
                    question: "Name a common type of event besides click.",
                    options: ["hover", "visible", "keydown", "change"],
                    correct: 2,
                    explanation: "Answer: <strong>keydown</strong>"
                },
                {
                    question: "Why is addEventListener preferred over inline onclick attributes?",
                    options: ["It runs faster", "It keeps JavaScript separate from HTML and allows multiple listeners", "It only works on modern browsers", "It requires less code"],
                    correct: 1,
                    explanation: "Answer: <strong>It keeps JavaScript separate from HTML and allows multiple listeners</strong>"
                },
                {
                    question: "True or False: A function must always be attached to an event handler to run.",
                    options: ["True", "False"],
                    correct: 1,
                    explanation: "Answer: <strong>False</strong>"
                },
                {
                    question: "What happens if you write button.addEventListener(\"click\", handleClick()); with parentheses?",
                    options: ["It works correctly", "The function runs immediately instead of waiting for the click", "It causes a syntax error", "It runs the function twice"],
                    correct: 1,
                    explanation: "Answer: <strong>The function runs immediately instead of waiting for the click</strong>"
                }
            ]
        }
    },
    {
        id: 10,
        title: "Conditionals and User Input",
        description: "Let's learn how to make decisions in code and work with user input.",
        content: `
            <h3>Conditional Statements</h3>
            <p>Conditional statements allow programs to execute different code depending on whether a condition is true or false. The <span class="inline-code">if/else</span> structure is the foundation of decision-making:</p>
            
            <div class="code-block">
                <pre><code>let temperature = 30;
 
if (temperature > 35) {
  console.log("It's hot outside!");
} else if (temperature > 20) {
  console.log("The weather is pleasant.");
} else {
  console.log("It's cold outside!");
}</code></pre>
            </div>
            
            <h3>Getting Input Values</h3>
            <p>To work with data entered by users, access the <span class="inline-code">value</span> property of an input element:</p>
            
            <div class="code-block">
                <pre><code>&lt;label for="user-email"&gt;Email:&lt;/label&gt;
&lt;input type="email" id="user-email" placeholder="Enter your email" /&gt;
&lt;button id="submit-btn"&gt;Submit&lt;/button&gt;
&lt;p id="output"&gt;&lt;/p&gt;</code></pre>
            </div>
            
            <div class="code-block">
                <pre><code>let inputField = document.getElementById("user-email");
let button = document.getElementById("submit-btn");
let output = document.getElementById("output");
 
button.addEventListener("click", function() {
  let email = inputField.value;
 
  if (email === "") {
    output.textContent = "Please enter an email address.";
  } else {
    output.textContent = "Your email is: " + email;
  }
});</code></pre>
            </div>
            
            <h3>Comparison Operators</h3>
            <p>Comparison operators used in conditions:</p>
            <ul>
                <li><strong>===</strong> : Strict equality (same value and type)</li>
                <li><strong>!==</strong> : Not equal</li>
                <li><strong>&gt;</strong> : Greater than</li>
                <li><strong>&lt;</strong> : Less than</li>
                <li><strong>&gt;=</strong> : Greater than or equal to</li>
                <li><strong>&lt;=</strong> : Less than or equal to</li>
            </ul>
            
            <p>The <span class="inline-code">console.log()</span> method outputs messages to the browser's developer console, which is invaluable for debugging:</p>
            
            <div class="code-block">
                <pre><code>let score = 85;
console.log("Current score:", score);
// Open the browser's console (F12) to see this output</code></pre>
            </div>
            
            <p>The <span class="inline-code">else if</span> chain lets you check multiple conditions in sequence. The first condition that evaluates to true executes, and the rest are skipped. If no condition is true, the <span class="inline-code">else</span> block runs as a fallback.</p>
        `,
        quiz: {
            questions: [
                {
                    question: "What structure does JavaScript use for conditional logic?",
                    options: ["for/while", "try/catch", "if/else", "function/return"],
                    correct: 2,
                    explanation: "Answer: <strong>if/else</strong>"
                },
                {
                    question: "How do you get the text a user typed into &lt;input id=\"email\"&gt;?",
                    options: ["document.getElementById(\"email\").text", "document.getElementById(\"email\").innerHTML", "document.getElementById(\"email\").value", "document.getElementById(\"email\").content"],
                    correct: 2,
                    explanation: "Answer: <strong>document.getElementById(\"email\").value</strong>"
                },
                {
                    question: "What will if (score > 50) evaluate?",
                    options: ["Whether score is less than 50", "Whether score is exactly 50", "Whether score is greater than 50", "Whether score is not equal to 50"],
                    correct: 2,
                    explanation: "Answer: <strong>Whether score is greater than 50</strong>"
                },
                {
                    question: "What is the purpose of the else block?",
                    options: ["To repeat code multiple times", "To define a function", "To execute code when the if condition is false", "To end the program"],
                    correct: 2,
                    explanation: "Answer: <strong>To execute code when the if condition is false</strong>"
                },
                {
                    question: "Which operator checks for strict equality (same value and type)?",
                    options: ["=", "==", "===", "!="],
                    correct: 2,
                    explanation: "Answer: <strong>===</strong>"
                },
                {
                    question: "How do you output a message to the browser's developer console?",
                    options: ["alert(\"message\")", "print(\"message\")", "console.log(\"message\")", "write(\"message\")"],
                    correct: 2,
                    explanation: "Answer: <strong>console.log(\"message\")</strong>"
                }
            ]
        }
    },
    {
        id: 11,
        title: "Introduction to the Backend",
        description: "Let's learn what backend development is and how it differs from frontend development.",
        content: `
            <h3>Frontend vs Backend</h3>
            <p>The <strong>frontend</strong> is everything the user sees and interacts with in the browser—HTML, CSS, and JavaScript. The <strong>backend</strong> is the server-side logic that runs on a web server. It handles data storage, user authentication, business logic, and communication with databases.</p>
            
            <p>When you submit a form, the frontend sends a request to the backend. The backend processes that request—perhaps saving it to a database—and sends a response back. This is called the <strong>client-server model</strong>:</p>
            
            <div class="code-block">
                <pre><code>[Browser (Client)]  <--request/response-->  [Web Server (Backend)]  <-->  [Database]</code></pre>
            </div>
            
            <h3>Setting Up Node.js</h3>
            <p>Node.js allows JavaScript to run outside the browser, making it possible to write backend code in the same language as the frontend. To start a project, create a directory and initialize it:</p>
            
            <div class="code-block">
                <pre><code>mkdir my-first-server
cd my-first-server
npm init -y</code></pre>
            </div>
            
            <p>This creates a package.json file that tracks your project's dependencies and scripts. Install Express, a popular web framework:</p>
            
            <div class="code-block">
                <pre><code>npm install express</code></pre>
            </div>
            
            <p>This downloads Express into a node_modules folder and lists it in package.json under dependencies. The node_modules folder should never be committed to version control—add it to .gitignore.</p>
            
            <h3>Your First Server</h3>
            <p>Create a file called server.js:</p>
            
            <div class="code-block">
                <pre><code>const express = require("express");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

app.listen(PORT, () => {
  console.log(Server is running on http://localhost:\${PORT});
});</code></pre>
            </div>
            
            <p>Run the server with <span class="inline-code">node server.js</span>. Open a browser and visit http://localhost:3000/. The <span class="inline-code">app.get()</span> method defines a route—it listens for GET requests at a specific path. The callback function receives a request object (req) and a response object (res). <span class="inline-code">res.send()</span> sends a response back to the client.</p>
            
            <h3>Understanding HTTP Methods</h3>
            <p>HTTP defines request methods that indicate the desired action:</p>
            <ul>
                <li><strong>GET</strong> - Used to retrieve data, such as when loading a webpage</li>
                <li><strong>POST</strong> - Used to create new data, for example when submitting a signup form</li>
                <li><strong>PUT</strong> - Used to update existing data, such as editing a user profile</li>
                <li><strong>DELETE</strong> - Used to remove data, like deleting a comment</li>
            </ul>
            <p>Each route in Express specifies both a path and a method. The same path can behave differently depending on the method used.</p>
        `,
        quiz: {
            questions: [
                {
                    question: "What is the client-server model?",
                    options: ["A design pattern where all code runs in the browser", "A structure where the browser (client) sends requests to a web server (backend) that processes them and returns responses", "A database management technique", "A way to style web pages"],
                    correct: 1,
                    explanation: "Answer: <strong>A structure where the browser (client) sends requests to a web server (backend) that processes them and returns responses</strong>"
                },
                {
                    question: "What does Node.js allow JavaScript to do?",
                    options: ["Run only in the Chrome browser", "Replace HTML and CSS", "Run outside the browser on a server", "Create images and videos"],
                    correct: 2,
                    explanation: "Answer: <strong>Run outside the browser on a server</strong>"
                },
                {
                    question: "What command initializes a new Node.js project?",
                    options: ["node start", "npm install", "npm init -y", "express new"],
                    correct: 2,
                    explanation: "Answer: <strong>npm init -y</strong>"
                },
                {
                    question: "What does app.get(\"/\", ...) define in Express?",
                    options: ["A database connection", "A route that listens for GET requests at the root path", "A static file server", "A POST request handler"],
                    correct: 1,
                    explanation: "Answer: <strong>A route that listens for GET requests at the root path</strong>"
                },
                {
                    question: "Which HTTP method is typically used to create new data?",
                    options: ["GET", "POST", "PUT", "DELETE"],
                    correct: 1,
                    explanation: "Answer: <strong>POST</strong>"
                },
                {
                    question: "What parameter in a route handler represents the response to send back to the client?",
                    options: ["req", "app", "next", "res"],
                    correct: 3,
                    explanation: "Answer: <strong>res</strong>"
                }
            ]
        }
    },
    {
        id: 12,
        title: "Handling Requests and Serving Static Files",
        description: "Let's learn how to handle form submissions and serve HTML, CSS, and JavaScript files.",
        content: `
            <h3>Serving Static Files</h3>
            <p>So far, we've only sent plain text responses. Real applications serve complete HTML pages. Express can serve an entire folder of static files—including HTML, CSS, and client-side JavaScript—using <span class="inline-code">express.static()</span>:</p>
            
            <div class="code-block">
                <pre><code>const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

// Serve everything in the "public" folder
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
  console.log(Server running at http://localhost:\${PORT});
});</code></pre>
            </div>
            
            <h3>Project Structure</h3>
            <p>Organize your files clearly:</p>
            
            <div class="code-block">
                <pre><code>my-project/
├── public/
│   ├── index.html
│   ├── styles.css
│   └── script.js
├── server.js
├── package.json
└── .gitignore</code></pre>
            </div>
            
            <p>With <span class="inline-code">express.static("public")</span>, visiting http://localhost:3000/ automatically serves index.html. Other files are accessible at their relative paths, like http://localhost:3000/styles.css.</p>
            
            <h3>Handling POST Requests</h3>
            <p>When a user submits a form, the data needs to be read on the backend. First, add middleware to parse URL-encoded form data:</p>
            
            <div class="code-block">
                <pre><code>app.use(express.urlencoded({ extended: true }));</code></pre>
            </div>
            
            <p>Now create an HTML form in public/index.html:</p>
            
            <div class="code-block">
                <pre><code>&lt;form action="/submit" method="post"&gt;
  &lt;label for="name"&gt;Name:&lt;/label&gt;
  &lt;input type="text" id="name" name="name" /&gt;
  &lt;button type="submit"&gt;Submit&lt;/button&gt;
&lt;/form&gt;
&lt;p id="response-message"&gt;&lt;/p&gt;</code></pre>
            </div>
            
            <p>And handle it on the server:</p>
            
            <div class="code-block">
                <pre><code>app.post("/submit", (req, res) => {
  const userName = req.body.name;
  console.log("Received:", userName);
  res.send(<h1>Hello, \${userName}!</h1><a href="/">Go back</a>);
});</code></pre>
            </div>
            
            <p><span class="inline-code">req.body</span> contains the parsed form data. Each form field's name attribute becomes a key in req.body. The urlencoded middleware specifically parses data sent with application/x-www-form-urlencoded content type, which is the default for HTML forms.</p>
            
            <p>For more complex data like JSON, you would use <span class="inline-code">express.json()</span> middleware instead:</p>
            
            <div class="code-block">
                <pre><code>app.use(express.json());</code></pre>
            </div>
            
            <p>This allows you to read JSON data sent in the request body via req.body.</p>
        `,
        quiz: {
            questions: [
                {
                    question: "What does express.static() do?",
                    options: ["It creates a new Express application", "It serves static files (HTML, CSS, JS) from a specified folder", "It connects to a database", "It parses JSON request bodies"],
                    correct: 1,
                    explanation: "Answer: <strong>It serves static files (HTML, CSS, JS) from a specified folder</strong>"
                },
                {
                    question: "Where should client-side HTML, CSS, and JavaScript files typically live in a Node.js project?",
                    options: ["In the root directory", "In the node_modules folder", "In a dedicated folder like public", "Inside server.js"],
                    correct: 2,
                    explanation: "Answer: <strong>In a dedicated folder like public</strong>"
                },
                {
                    question: "What middleware parses form data sent via POST requests?",
                    options: ["express.json()", "express.static()", "express.urlencoded({ extended: true })", "express.form()"],
                    correct: 2,
                    explanation: "Answer: <strong>express.urlencoded({ extended: true })</strong>"
                },
                {
                    question: "In a form, what attribute determines the key name in req.body?",
                    options: ["id", "type", "name", "value"],
                    correct: 2,
                    explanation: "Answer: <strong>name</strong>"
                },
                {
                    question: "What does the action attribute on a &lt;form&gt; element specify?",
                    options: ["The HTTP method to use", "The CSS class to apply", "The URL where form data is sent", "The JavaScript function to call"],
                    correct: 2,
                    explanation: "Answer: <strong>The URL where form data is sent</strong>"
                },
                {
                    question: "If you want to read JSON data sent in a POST request body, which middleware should you use?",
                    options: ["express.static()", "express.urlencoded()", "express.json()", "express.text()"],
                    correct: 2,
                    explanation: "Answer: <strong>express.json()</strong>"
                }
            ]
        }
    },
    {
        id: 13,
        title: "Introduction to Databases with SQLite",
        description: "Let's learn how to store and retrieve data persistently using a database.",
        content: `
            <h3>Why Use a Database?</h3>
            <p>Without a database, all data is lost when the server restarts. Databases provide permanent storage. SQLite is a lightweight, file-based database—perfect for learning. Unlike larger databases like PostgreSQL or MySQL, SQLite requires no separate installation or server process. Everything is stored in a single file.</p>
            
            <p>Install the better-sqlite3 package:</p>
            
            <div class="code-block">
                <pre><code>npm install better-sqlite3</code></pre>
            </div>
            
            <h3>Setting Up the Database</h3>
            <p>Create a database.js file to manage your database connection:</p>
            
            <div class="code-block">
                <pre><code>const Database = require("better-sqlite3");
const db = new Database("app.db");

// Create a table if it doesn't exist
db.exec(
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL
  )
);

module.exports = db;</code></pre>
            </div>
            
            <p>CREATE TABLE IF NOT EXISTS is safe to run multiple times—it won't overwrite an existing table. PRIMARY KEY uniquely identifies each row, and AUTOINCREMENT automatically assigns a new number. UNIQUE on the email column prevents duplicate email addresses.</p>
            
            <h3>CRUD Operations</h3>
            <p>CRUD stands for Create, Read, Update, Delete—the four fundamental database operations:</p>
            
            <div class="code-block">
                <pre><code>const db = require("./database.js");

// CREATE - Insert a new user
const insertUser = db.prepare("INSERT INTO users (name, email) VALUES (?, ?)");
insertUser.run("Alice", "alice@example.com");

// READ - Fetch all users
const getAllUsers = db.prepare("SELECT * FROM users");
const users = getAllUsers.all();
console.log(users);

// READ - Fetch one user by ID
const getUserById = db.prepare("SELECT * FROM users WHERE id = ?");
const user = getUserById.get(1);
console.log(user);

// UPDATE - Modify a user's name
const updateUser = db.prepare("UPDATE users SET name = ? WHERE id = ?");
updateUser.run("Alice Johnson", 1);

// DELETE - Remove a user
const deleteUser = db.prepare("DELETE FROM users WHERE id = ?");
deleteUser.run(1);</code></pre>
            </div>
            
            <p>Using prepared statements with ? placeholders is crucial—they protect against SQL injection attacks, where a malicious user could insert SQL code into an input field. The db.prepare() method compiles the SQL once and can be reused efficiently.</p>
            
            <p>The difference between .run(), .get(), and .all():</p>
            <ul>
                <li><strong>.run()</strong> - For INSERT, UPDATE, DELETE—returns info about changes</li>
                <li><strong>.get()</strong> - Returns the first matching row as an object</li>
                <li><strong>.all()</strong> - Returns all matching rows as an array of objects</li>
            </ul>
        `,
        quiz: {
            questions: [
                {
                    question: "Why is a database needed in a web application?",
                    options: ["To style web pages", "To handle HTTP requests", "To store data persistently so it survives server restarts", "To replace HTML files"],
                    correct: 2,
                    explanation: "Answer: <strong>To store data persistently so it survives server restarts</strong>"
                },
                {
                    question: "What kind of database is SQLite?",
                    options: ["A cloud-based database", "A lightweight, file-based relational database", "A NoSQL document database", "An in-memory cache only"],
                    correct: 1,
                    explanation: "Answer: <strong>A lightweight, file-based relational database</strong>"
                },
                {
                    question: "What does CRUD stand for?",
                    options: ["Copy, Read, Update, Delete", "Create, Retrieve, Upload, Download", "Create, Read, Update, Delete", "Connect, Request, Understand, Display"],
                    correct: 2,
                    explanation: "Answer: <strong>Create, Read, Update, Delete</strong>"
                },
                {
                    question: "What is the purpose of a PRIMARY KEY in a database table?",
                    options: ["It encrypts the data in the table", "It uniquely identifies each row in the table", "It speeds up CSS loading", "It creates a backup of the database"],
                    correct: 1,
                    explanation: "Answer: <strong>It uniquely identifies each row in the table</strong>"
                },
                {
                    question: "Why are prepared statements (with ? placeholders) important?",
                    options: ["They make the code shorter", "They protect against SQL injection attacks", "They automatically style the output", "They only work with SQLite"],
                    correct: 1,
                    explanation: "Answer: <strong>They protect against SQL injection attacks</strong>"
                },
                {
                    question: "Which method returns all matching rows from a SELECT query?",
                    options: [".run()", ".get()", ".all()", ".fetch()"],
                    correct: 2,
                    explanation: "Answer: <strong>.all()</strong>"
                }
            ]
        }
    },
    {
        id: 14,
        title: "Building a REST API",
        description: "Let's learn how to build API endpoints that connect the frontend to the database.",
        content: `
            <h3>What is a REST API?</h3>
            <p>A <strong>REST API</strong> (Representational State Transfer) defines a set of routes that allow clients to perform CRUD operations on resources. Each route combines an HTTP method with a URL path:</p>
            
            <ul>
                <li><strong>GET /api/users</strong> - Retrieves a list of all users</li>
                <li><strong>GET /api/users/:id</strong> - Fetches a specific user by their ID</li>
                <li><strong>POST /api/users</strong> - Creates a new user</li>
                <li><strong>PUT /api/users/:id</strong> - Updates an existing user</li>
                <li><strong>DELETE /api/users/:id</strong> - Removes a user from the system</li>
            </ul>
            
            <h3>Building the Routes</h3>
            <p>Create or update server.js with full CRUD routes:</p>
            
            <div class="code-block">
                <pre><code>const express = require("express");
const db = require("./database.js");
const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.use(express.json());

// GET all users
app.get("/api/users", (req, res) => {
  const users = db.prepare("SELECT * FROM users").all();
  res.json(users);
});

// GET a single user by ID
app.get("/api/users/:id", (req, res) => {
  const user = db.prepare("SELECT * FROM users WHERE id = ?").get(req.params.id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.json(user);
});

// POST - Create a new user
app.post("/api/users", (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }
  try {
    const result = db.prepare("INSERT INTO users (name, email) VALUES (?, ?)").run(name, email);
    res.status(201).json({ id: result.lastInsertRowid, name, email });
  } catch (err) {
    res.status(400).json({ error: "Email already exists" });
  }
});
// PUT - Update a user
app.put("/api/users/:id", (req, res) => {
  const { name, email } = req.body;
  const user = db.prepare("SELECT * FROM users WHERE id = ?").get(req.params.id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  db.prepare("UPDATE users SET name = ?, email = ? WHERE id = ?").run(
    name || user.name,
    email || user.email,
    req.params.id
  );
  res.json({ message: "User updated" });
});

// DELETE - Remove a user
app.delete("/api/users/:id", (req, res) => {
  const user = db.prepare("SELECT * FROM users WHERE id = ?").get(req.params.id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  db.prepare("DELETE FROM users WHERE id = ?").run(req.params.id);
  res.json({ message: "User deleted" });
});

app.listen(PORT, () => {
  console.log(API running at http://localhost:\${PORT});
});</code></pre>
            </div>
            
            <h3>Understanding req.params and Status Codes</h3>
            <p><span class="inline-code">req.params</span> captures dynamic segments from the URL. In the route <span class="inline-code">/api/users/:id</span>, :id is a placeholder. A request to /api/users/3 makes req.params.id equal to "3".</p>
            
            <p>HTTP status codes communicate the result:</p>
            <ul>
                <li><strong>200 OK</strong> - Successful request</li>
                <li><strong>201 Created</strong> - Resource successfully created</li>
                <li><strong>400 Bad Request</strong> - Client sent invalid data</li>
                <li><strong>404 Not Found</strong> - Resource doesn't exist</li>
                <li><strong>500 Internal Server Error</strong> - Something went wrong on the server</li>
            </ul>
            
            <p><span class="inline-code">res.json()</span> automatically sets the Content-Type header to application/json and converts JavaScript objects to JSON strings. Modern APIs almost always communicate using JSON because it's lightweight and natively supported by JavaScript.</p>
            
            <p>The try/catch block in the POST route handles database errors gracefully. If an email already exists, the UNIQUE constraint on the users table throws an error, and we catch it to send a friendly message instead of crashing the server.</p>
        `,
        quiz: {
            questions: [
                {
                    question: "What does REST stand for?",
                    options: ["Real-Time Server Transfer", "Representational State Transfer", "Remote Execution and Storage Technology", "Rapid Endpoint Service Template"],
                    correct: 1,
                    explanation: "Answer: <strong>Representational State Transfer</strong>"
                },
                {
                    question: "What route pattern would match a request to /api/users/5?",
                    options: ["/api/users", "/api/users/:id", "/api/users/*", "/api/users?id=5"],
                    correct: 1,
                    explanation: "Answer: <strong>/api/users/:id</strong>"
                },
                {
                    question: "What does req.params contain?",
                    options: ["Query string parameters", "Form data from a POST request", "Dynamic values from the URL path (like :id)", "HTTP headers"],
                    correct: 2,
                    explanation: "Answer: <strong>Dynamic values from the URL path (like :id)</strong>"
                },
                {
                    question: "What HTTP status code indicates a resource was successfully created?",
                    options: ["200", "201", "400", "404"],
                    correct: 1,
                    explanation: "Answer: <strong>201</strong>"
                },
                {
                    question: "What does res.json() do?",
                    options: ["It serves an HTML file", "It redirects to another URL", "It sends a JSON response with the correct Content-Type header", "It parses incoming JSON data"],
                    correct: 2,
                    explanation: "Answer: <strong>It sends a JSON response with the correct Content-Type header</strong>"
                },
                {
                    question: "In the route DELETE /api/users/:id, what does :id represent?",
                    options: ["A fixed string literal", "A dynamic placeholder for the user's ID", "The name of a CSS class", "A database table name"],
                    correct: 1,
                    explanation: "Answer: <strong>A dynamic placeholder for the user's ID</strong>"
                }
            ]
        }
    },
    {
        id: 15,
        title: "Robust Frontend-Backend Communication",
        description: "Learn how to handle loading states, network errors, timeouts, and proper validation.",
        content: `
            <h3>Robust Frontend-Backend Communication</h3>
            <p>When the frontend communicates with a backend API, many things can go wrong: the network might be slow, the server could be down, the user might submit invalid data, or the response might not match what was expected. Building a robust connection means gracefully handling all of these edge cases.</p>
            
            <h3>Handling Loading States</h3>
            <p>Users need feedback while waiting for a response. Without it, they might think the app is broken. A simple pattern is to toggle a loading indicator:</p>
            
            <div class="code-block">
                <pre><code>&lt;button id="fetch-btn"&gt;Load Users&lt;/button&gt;
&lt;span id="loading-indicator" style="display: none;"&gt;Loading...&lt;/span&gt;
&lt;ul id="user-list"&gt;&lt;/ul&gt;</code></pre>
            </div>
            
            <div class="code-block">
                <pre><code>const button = document.getElementById("fetch-btn");
const loadingIndicator = document.getElementById("loading-indicator");
const userList = document.getElementById("user-list");

async function loadUsers() {
  // Show loading, disable button
  loadingIndicator.style.display = "inline";
  button.disabled = true;
  userList.innerHTML = "";

  try {
    const response = await fetch("/api/users");

    if (!response.ok) {
      throw new Error(\`Server responded with status: \${response.status}\`);
    }

    const users = await response.json();

    if (users.length === 0) {
      userList.innerHTML = "&lt;li&gt;No users found.&lt;/li&gt;";
      return;
    }

    users.forEach(user => {
      const li = document.createElement("li");
      li.textContent = \`\${user.name} (\${user.email})\`;
      userList.appendChild(li);
    });
  } catch (error) {
    userList.innerHTML = \`&lt;li style="color: red;"&gt;Failed to load users: \${error.message}&lt;/li&gt;\`;
  } finally {
    // Always hide loading and re-enable button
    loadingIndicator.style.display = "none";
    button.disabled = false;
  }
}

button.addEventListener("click", loadUsers);</code></pre>
            </div>
            
            <p>The <span class="inline-code">finally</span> block is crucial—it runs whether the request succeeds or fails. This ensures the loading indicator always disappears and the button always becomes clickable again.</p>
            
            <h3>Handling Network Errors vs. HTTP Errors</h3>
            <p>There's an important distinction when using fetch:</p>
            <ul>
                <li><strong>Network errors</strong> (no internet, DNS failure, CORS issues): The fetch Promise rejects, triggering the catch block.</li>
                <li><strong>HTTP errors</strong> (404, 500, etc.): Fetch still resolves successfully. You must check response.ok or response.status manually.</li>
            </ul>
            
            <div class="code-block">
                <pre><code>async function safeFetch(url, options = {}) {
  try {
    const response = await fetch(url, options);

    if (response.status === 404) {
      throw new Error("The requested resource was not found.");
    }

    if (response.status === 500) {
      throw new Error("The server encountered an internal error. Please try again later.");
    }

    if (!response.ok) {
      throw new Error(\`Unexpected error (Status: \${response.status})\`);
    }

    return await response.json();
  } catch (error) {
    // Distinguish between network errors and other errors
    if (error.name === "TypeError" && error.message === "Failed to fetch") {
      throw new Error("Network error: Please check your internet connection.");
    }
    throw error; // Re-throw HTTP or other errors
  }
}</code></pre>
            </div>
            
            <h3>Adding Request Timeouts</h3>
            <p>Fetch doesn't natively support timeouts. A request could hang indefinitely if the server is unresponsive. You can implement a timeout using AbortController:</p>
            
            <div class="code-block">
                <pre><code>async function fetchWithTimeout(url, options = {}, timeoutMs = 8000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(\`Request failed with status \${response.status}\`);
    }

    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);

    if (error.name === "AbortError") {
      throw new Error(\`Request timed out after \${timeoutMs}ms\`);
    }
    throw error;
  }
}</code></pre>
            </div>
            
            <p>An 8-second timeout is a reasonable default—adjust it based on what your endpoint does.</p>
            
            <h3>Validating Data on the Client Side Before Sending</h3>
            <p>Catching errors early on the client improves user experience and reduces unnecessary server load:</p>
            
            <div class="code-block">
                <pre><code>function validateForm(name, email) {
  const errors = {};

  if (!name || name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters long.";
  }

  if (!email || !email.includes("@")) {
    errors.email = "Please enter a valid email address.";
  }

  return errors;
}</code></pre>
            </div>
            
            <p>Client-side validation is for user experience—it provides instant feedback. Server-side validation is for security—never trust client data alone.</p>
            
            <h3>Retrying Failed Requests</h3>
            <p>For transient failures (like temporary network drops), retrying with exponential backoff can improve reliability:</p>
            
            <div class="code-block">
                <pre><code>async function fetchWithRetry(url, options = {}, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url, options);

      if (!response.ok && response.status >= 500) {
        // Only retry server errors, not client errors like 400 or 404
        throw new Error(\`Server error: \${response.status}\`);
      }

      return await response.json();
    } catch (error) {
      if (attempt === maxRetries) {
        throw new Error(\`Request failed after \${maxRetries} attempts: \${error.message}\`);
      }

      // Exponential backoff: wait 1s, then 2s, then 4s...
      const delay = Math.pow(2, attempt - 1) * 1000;
      console.warn(\`Attempt \${attempt} failed. Retrying in \${delay}ms...\`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}</code></pre>
            </div>
            
            <p>Exponential backoff prevents overwhelming a struggling server with rapid retry attempts. Client errors (400-level) are not retried because resending the same invalid data will just produce the same result.</p>
        `,
        quiz: {
            questions: [
                {
                    question: "What is the purpose of the finally block in a try/catch?",
                    options: ["It only runs if the try block succeeds", "It only runs if the catch block executes", "It runs regardless of whether the try block succeeds or the catch block executes", "It stops the code from throwing errors"],
                    correct: 2,
                    explanation: "The <strong>finally block</strong> runs regardless of whether the try block succeeds or the catch block executes."
                },
                {
                    question: "What must you check manually on a fetch response to detect HTTP errors like 404?",
                    options: ["response.data", "response.error", "response.ok or response.status", "response.headers"],
                    correct: 2,
                    explanation: "You must check <strong>response.ok or response.status</strong> manually, as fetch doesn't reject on HTTP errors."
                },
                {
                    question: "Which Web API allows you to cancel an ongoing fetch request?",
                    options: ["CancelToken", "AbortController", "FetchStopper", "RequestTerminator"],
                    correct: 1,
                    explanation: "<strong>AbortController</strong> is the Web API that allows canceling ongoing fetch requests."
                },
                {
                    question: "Why is client-side validation alone insufficient?",
                    options: ["It makes the page load slower", "It doesn't work on mobile devices", "A user can bypass client-side JavaScript, so the server must always re-validate", "It requires too much code"],
                    correct: 2,
                    explanation: "<strong>A user can bypass client-side JavaScript</strong>, so the server must always re-validate for security."
                },
                {
                    question: "What is exponential backoff in the context of retrying requests?",
                    options: ["Retrying immediately without any delay", "Increasing the delay between retries exponentially (e.g., 1s, 2s, 4s)", "Sending multiple requests simultaneously", "Canceling all requests after one failure"],
                    correct: 1,
                    explanation: "<strong>Exponential backoff</strong> means increasing the delay between retries exponentially (e.g., 1s, 2s, 4s)."
                },
                {
                    question: "Should you retry a request that returned a 400 Bad Request status?",
                    options: ["Yes, always", "No, because resending the same invalid data will likely produce the same error", "Yes, but only once", "Only if the user refreshes the page"],
                    correct: 1,
                    explanation: "<strong>No</strong>, because resending the same invalid data will likely produce the same error."
                }
            ]
        }
    }
];

// =============================================
// MODULES PAGE FUNCTIONALITY
// =============================================

// Get module progress from localStorage
function getModuleProgress() {
    const saved = localStorage.getItem('htmlModulesProgress');
    return saved ? JSON.parse(saved) : {};
}

// Save module progress to localStorage
function saveModuleProgress(progress) {
    localStorage.setItem('htmlModulesProgress', JSON.stringify(progress));
}

// Mark module as completed
function completeModule(moduleId) {
    const progress = getModuleProgress();
    progress[moduleId] = {
        completed: true,
        completedAt: new Date().toISOString()
    };
    saveModuleProgress(progress);
    updateProgressDisplay();
}

// Check if module is completed
function isModuleCompleted(moduleId) {
    const progress = getModuleProgress();
    return progress[moduleId]?.completed || false;
}

// Get completed modules count
function getCompletedCount() {
    const progress = getModuleProgress();
    return Object.values(progress).filter(p => p.completed).length;
}

// Update progress display
function updateProgressDisplay() {
    const completed = getCompletedCount();
    const total = modulesData.length;
    const percentage = (completed / total) * 100;
    
    // Update sidebar progress
    const countElement = document.getElementById('completedCount');
    if (countElement) {
        countElement.textContent = completed;
    }
    
    const progressBar = document.getElementById('overallProgress');
    if (progressBar) {
        progressBar.style.width = `${percentage}%`;
    }
}

// Render module cards on main page
function renderModuleCards() {
    const grid = document.getElementById('modulesGrid');
    if (!grid) return;
    
    grid.innerHTML = modulesData.map(module => {
        const completed = isModuleCompleted(module.id);
        return `
            <div class="module-card ${completed ? 'completed' : ''}" onclick="playSFX('sound-fx/click.mp3'); window.location.href='module.html?id=${module.id}'">
                <div class="module-card-number">${module.id}</div>
                <h3 class="module-card-title">${module.title}</h3>
                <p class="module-card-desc">${module.description}</p>
                ${completed ? '<div class="module-card-progress"><span class="module-card-progress-text">✓ Completed</span></div>' : ''}
            </div>
        `;
    }).join('');
}

// Render sidebar navigation
function renderSidebarNav(activeModuleId = null) {
    const navList = document.getElementById('moduleNavList');
    if (!navList) return;
    
    navList.innerHTML = modulesData.map(module => {
        const completed = isModuleCompleted(module.id);
        const isActive = module.id === activeModuleId;
        
        return `
            <a href="module.html?id=${module.id}" class="module-nav-item ${isActive ? 'active' : ''} ${completed ? 'completed' : ''}" onclick="playSFX('sound-fx/click.mp3')">
                <div class="module-nav-number">${module.id}</div>
                <div class="module-nav-info">
                    <span class="module-nav-title">${module.title}</span>
                    <span class="module-nav-status">${completed ? 'Completed' : 'Not started'}</span>
                </div>
                ${completed ? '<span class="check-icon">✓</span>' : ''}
            </a>
        `;
    }).join('');
}

// =============================================
// MODULE DETAIL PAGE FUNCTIONALITY
// =============================================

// Load module content
function loadModuleContent() {
    const urlParams = new URLSearchParams(window.location.search);
    const moduleId = parseInt(urlParams.get('id'));
    
    if (!moduleId || !modulesData[moduleId - 1]) {
        window.location.href = 'modules.html';
        return;
    }
    
    const module = modulesData[moduleId - 1];
    const detailContainer = document.getElementById('moduleDetail');
    
    if (!detailContainer) return;
    
    // Update page title
    document.title = `Combat Coders - ${module.title}`;
    
    // Render sidebar
    renderSidebarNav(moduleId);
    updateProgressDisplay();
    
    // Render module content
    detailContainer.innerHTML = `
        <div class="module-detail-header">
            <div class="module-breadcrumb">
                <a href="modules.html">HTML Modules</a> > Module ${module.id}
            </div>
            <h1 class="module-detail-title">Module ${module.id}: ${module.title}</h1>
            <p class="module-detail-desc">${module.description}</p>
        </div>
        
        <div class="module-content">
            ${module.content}
        </div>
        
        ${renderQuiz(module)}
        
        <div class="module-navigation">
            ${moduleId > 1 ? `<button class="module-nav-btn prev" onclick="playSFX('sound-fx/click.mp3'); window.location.href='module.html?id=${moduleId - 1}'">← Previous</button>` : '<div></div>'}
            ${moduleId < modulesData.length ? `<button class="module-nav-btn next" onclick="playSFX('sound-fx/click.mp3'); window.location.href='module.html?id=${moduleId + 1}'">Next Module →</button>` : '<div></div>'}
        </div>
    `;
    
    // Apply syntax highlighting after content is rendered
    applySyntaxHighlighting();
}

// Render quiz section
function renderQuiz(module) {
    const questions = module.quiz.questions;
    
    return `
        <div class="module-quiz-section" id="quizSection">
            <div class="module-quiz-header">
                <span class="module-quiz-icon">🧠</span>
                <div>
                    <h2 class="module-quiz-title">Knowledge Check</h2>
                    <span class="module-quiz-subtitle">Test your understanding of ${module.title}</span>
                </div>
            </div>
            
            <form id="quizForm" onsubmit="event.preventDefault(); submitQuiz(${module.id});">
                ${questions.map((q, index) => `
                    <div class="quiz-question-block">
                        <div class="quiz-question-number">Question ${index + 1} of ${questions.length}</div>
                        <p class="quiz-question-text">${q.question}</p>
                        <div class="quiz-options">
                            ${q.options.map((option, optIndex) => `
                                <label class="quiz-option">
                                    <input type="radio" name="q${index}" value="${optIndex}" required>
                                    <span class="quiz-option-label">${option}</span>
                                </label>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
                
                <div class="quiz-submit-container">
                    <button type="submit" class="quiz-submit-btn">SUBMIT ANSWERS</button>
                </div>
            </form>
            
            <div id="quizResults" class="hidden"></div>
        </div>
    `;
}

async function syncModuleQuizToServer(moduleId, correct, total) {
    const token = localStorage.getItem('authToken');
    if (!token) return;
    const API_BASE = window.API_BASE_URL || 'http://localhost:5000';
    try {
        const r = await fetch(`${API_BASE}/api/players/me/learning-progress`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            credentials: 'include',
            body: JSON.stringify({
                moduleQuiz: { moduleId, correct, total }
            })
        });
        if (!r.ok) console.warn('Module quiz sync HTTP', r.status);
    } catch (e) {
        console.warn('Module quiz sync failed', e);
    }
}

// Submit quiz and show results
function submitQuiz(moduleId) {
    const module = modulesData[moduleId - 1];
    const questions = module.quiz.questions;
    const form = document.getElementById('quizForm');
    const formData = new FormData(form);
    
    // Check if all questions are answered
    let allAnswered = true;
    const unanswered = [];
    
    for (let i = 0; i < questions.length; i++) {
        if (!formData.get(`q${i}`)) {
            allAnswered = false;
            unanswered.push(i + 1);
        }
    }
    
    if (!allAnswered) {
        showWarningModal(`Please answer all questions before submitting!\n\nUnanswered questions: ${unanswered.join(', ')}`);
        return;
    }
    
    // Calculate score
    let correct = 0;
    const results = [];
    
    for (let i = 0; i < questions.length; i++) {
        const selected = parseInt(formData.get(`q${i}`));
        const isCorrect = selected === questions[i].correct;
        
        if (isCorrect) correct++;
        
        results.push({
            question: questions[i].question,
            selected: questions[i].options[selected],
            correct: questions[i].options[questions[i].correct],
            explanation: questions[i].explanation,
            isCorrect: isCorrect
        });
    }
    
    // Show results
    showQuizResults(correct, questions.length, results, moduleId);
}

// Show quiz results
function showQuizResults(correct, total, results, moduleId) {
    syncModuleQuizToServer(moduleId, correct, total);
    const percentage = (correct / total) * 100;
    let feedbackClass = 'retry';
    let feedbackMessage = '📚 Keep studying! Review the material and try again.';
    
    if (percentage === 100) {
        feedbackClass = 'perfect';
        feedbackMessage = '🏆 Perfect Score! You\'re an HTML master!';
        completeModule(moduleId);
    } else if (percentage >= 60) {
        feedbackClass = 'good';
        feedbackMessage = '👍 Good job! You understand the concepts well.';
        completeModule(moduleId);
    }
    
    const resultsHTML = `
        <div class="quiz-results-container">
            <div class="quiz-score-display">
                <div class="quiz-score-number">${correct}/${total}</div>
                <div class="quiz-score-text">${percentage}% Correct</div>
            </div>
            
            <div class="quiz-feedback ${feedbackClass}">
                ${feedbackMessage}
            </div>
            
            <div class="quiz-answer-breakdown">
                <h4>Answer Breakdown:</h4>
                ${results.map((r, i) => `
                    <div class="quiz-answer-item ${r.isCorrect ? 'correct' : 'incorrect'}">
                        <div class="quiz-answer-status">${r.isCorrect ? '✅ Correct' : '❌ Incorrect'} - Question ${i + 1}</div>
                        ${!r.isCorrect ? `<div>Your answer: ${r.selected}</div>` : ''}
                        <div>Correct answer: ${r.correct}</div>
                        <div class="quiz-answer-explanation">${r.explanation}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    // Show in modal
    document.getElementById('quizModalTitle').textContent = 'QUIZ RESULTS';
    document.getElementById('quizModalContent').innerHTML = resultsHTML;
    document.getElementById('quizModal').classList.remove('hidden');
    
    // Also show inline
    const resultsDiv = document.getElementById('quizResults');
    if (resultsDiv) {
        resultsDiv.innerHTML = resultsHTML;
        resultsDiv.classList.remove('hidden');
        form.classList.add('hidden');
    }
}

// Show warning modal
function showWarningModal(message) {
    document.getElementById('warningModalMessage').textContent = message;
    document.getElementById('warningModal').classList.remove('hidden');
}

// Close warning modal
function closeWarningModal() {
    document.getElementById('warningModal').classList.add('hidden');
}

// Close quiz modal
function closeQuizModal() {
    document.getElementById('quizModal').classList.add('hidden');
}

// =============================================
// SYNTAX HIGHLIGHTING FOR CODE BLOCKS
// =============================================

function applySyntaxHighlighting() {
    const codeBlocks = document.querySelectorAll('.code-block');
    
    codeBlocks.forEach(block => {
        const pre = block.querySelector('pre');
        if (!pre) return;
        
        let html = pre.innerHTML;
        
        // Detect language based on content
        let language = 'html';
        if (html.includes('color:') || html.includes('display:') || html.includes('{') && html.includes('}')) {
            language = 'css';
        } else if (html.includes('const ') || html.includes('let ') || html.includes('function') || html.includes('document.')) {
            language = 'javascript';
        }
        
        // Set data-language attribute for the header
        block.setAttribute('data-language', language);
        
        // HTML/CSS/JS Syntax highlighting
        if (language === 'html') {
            // Highlight HTML tags - match <tagname or </tagname
            html = html.replace(/&lt;(\/?)([a-zA-Z0-9]+)(.*?)&gt;/g, function(match, slash, tagName, attrs) {
                let highlighted = '&lt;' + (slash ? '<span class="code-tag">/</span>' : '');
                highlighted += '<span class="code-tag-name">' + tagName + '</span>';
                
                // Highlight attributes within the tag
                if (attrs) {
                    highlighted += attrs.replace(/([a-zA-Z-]+)=(&quot;.*?&quot;|&#39;.*?&#39;)/g, 
                        '<span class="code-attr">$1</span>=<span class="code-attr-value">$2</span>');
                }
                
                highlighted += '&gt;';
                return highlighted;
            });
            
            // Highlight comments
            html = html.replace(/(&lt;!--.*?--&gt;)/g, '<span class="code-comment">$1</span>');
            
        } else if (language === 'css') {
            // Highlight CSS selectors
            html = html.replace(/^([a-zA-Z.#\[\]_-]+)\s*\{/gm, '<span class="code-selector">$1</span> {');
            
            // Highlight properties and values
            html = html.replace(/([a-zA-Z-]+):\s*([^;]+);/g, 
                '<span class="code-property">$1</span>: <span class="code-value">$2</span>;');
            
            // Highlight numbers in values
            html = html.replace(/:\s*(\d+(?:px|em|rem|%|vh|vw)?)/g, 
                ': <span class="code-number">$1</span>');
                
        } else if (language === 'javascript') {
            // Highlight keywords
            const keywords = ['const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while'];
            keywords.forEach(keyword => {
                const regex = new RegExp('\\b(' + keyword + ')\\b', 'g');
                html = html.replace(regex, '<span class="code-keyword">$1</span>');
            });
            
            // Highlight functions
            html = html.replace(/([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/g, 
                '<span class="code-function">$1</span>(');
            
            // Highlight strings
            html = html.replace(/(&quot;.*?&quot;|&#39;.*?&#39;)/g, '<span class="code-string">$1</span>');
            
            // Highlight comments
            html = html.replace(/(\/\/.*$)/gm, '<span class="code-comment">$1</span>');
        }
        
        pre.innerHTML = html;
    });
}

// =============================================
// INITIALIZATION
// =============================================

document.addEventListener('DOMContentLoaded', function() {
    // Update progress on all module pages
    updateProgressDisplay();
    
    // Render module cards if on main modules page
    renderModuleCards();
    
    // Render sidebar if on module detail page (without active module)
    if (!window.location.search.includes('id=')) {
        renderSidebarNav();
    }
    
    // Apply syntax highlighting to code blocks
    applySyntaxHighlighting();
    
    // Close modals on overlay click
    const warningModal = document.getElementById('warningModal');
    if (warningModal) {
        warningModal.addEventListener('click', function(e) {
            if (e.target === this) closeWarningModal();
        });
    }
    
    const quizModal = document.getElementById('quizModal');
    if (quizModal) {
        quizModal.addEventListener('click', function(e) {
            if (e.target === this) closeQuizModal();
        });
    }
    
    // Close modals on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeWarningModal();
            closeQuizModal();
        }
    });
});
