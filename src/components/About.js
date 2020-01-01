import React from "react";
import Link from "@material-ui/core/Link";

export default function About() {
  return (
    <div style={{marginLeft: 20}}>
      <h1>About Us</h1>
      <p>Applying 21st century techniques to learning Chinese.</p>
      <p>
        Possibly the most challenging aspect of learning to read or write a
        Chinese word is that there often is no obvious way to memorize it. A
        common trick is to spot certain smaller characters inside a character,
        but this does not work for many words.
      </p>
      <p>
        背中文 is crowdsourced learning to memorize Chinese, using 21st century
        technology to learn Chinese. It is a forum where you can contribute your
        ideas on how to memorize any particular word or phrase. Feel free to be
        creative.
      </p>
      <p>
        For example, the term "庄严 (zhuāng yuán)" means "solemn". "庄" has few
        strokes, but is not a common character, so it may be difficult to
        memorize. 1 trick is to think of the more common character "装", and
        that "庄严" can be remembered as "pretending to be solemn".
      </p>
      <p>
        Another example is the word "吼叫 (hǒu jiào)", which means "yell". "吼"
        is not a common word. You can think of laughing "ho ho" when you see it,
        which may make it easier to remember even though the term means yelling
        and not laughing. It's inaccurate, but just a trick to remember how to
        memorize this character.
      </p>
      <p>
        We are excited to see what your creativity is capable of. Follow us on{" "}
        <Link href="https://www.facebook.com/%E5%90%AC%E5%86%99-295524347790755/">
          Facebook
        </Link>
        . Feel free to leave comments and feedback. Let's work together in our
        Chinese proficiency!
      </p>
    </div>
  );
}
