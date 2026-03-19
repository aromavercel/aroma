import React from "react";

export default function BlogSingle({ blog }) {
  return (
    <section className="s-blog-single line-bottom-container">
      <div className="container">
        <div className="heading blog-item">
          <div className="entry-tag">
            <ul className="style-list">
              <li>
                <a href="#" className="type-life">
                  {" "}
                  Lifestyle{" "}
                </a>
              </li>
            </ul>
          </div>
          <p className="entry_title display-sm fw-medium">
            {blog.title
              ? blog.title
              : "5 Timeless Wardrobe Essentials Every Woman Should Own"}
          </p>
          <ul className="entry-meta">
            <li className="entry_author">
              <div className="avatar">
                <img
                  src="/images/avatar/blog-author-1.jpg"
                  alt="avatar"
                  className="lazyload"
                  width={100}
                  height={100}
                />
              </div>
              <p className="entry_name">
                Post by <span className="fw-medium"> Vinetant </span>
              </p>
            </li>
            <li className="br-line" />
            <li className="entry_date">
              <p className="text-md">Sep 19 2024</p>
            </li>
            <li className="br-line" />
            <li className="entry_comment">
              <p className="text-md">3 comments</p>
            </li>
          </ul>
        </div>
        <div className="content">
          <div className="entry_image">
            <img
              src="/images/blog/blog-single-1.jpg"
              alt=""
              className="lazyload"
              width={1440}
              height={501}
            />
          </div>
          <p className="text">
            Pellentesque dapibus hendrerit tortor. Nam ipsum risus, rutrum
            vitae, vestibulum eu, molestie vel, lacus. Sed libero. Phasellus
            tempus. Etiam feugiat lorem non metus. Morbi mattis ullamcorper
            velit. Donec sodales sagittis magna. Curabitur a felis in nunc
            fringilla tristique. Quisque malesuada placerat nisl. Phasellus
            gravida semper nisi.
          </p>
          <p className="text">
            Curabitur blandit mollis lacus. Phasellus nec sem in justo
            pellentesque facilisis. Mauris turpis nunc, blandit et, volutpat
            molestie, porta ut, ligula. Fusce ac felis sit amet ligula pharetra
            condimentum. Integer tincidunt.
          </p>
          <p className="text">
            Maecenas vestibulum mollis diam. Pellentesque auctor neque nec urna.
            Pellentesque commodo eros a enim. Etiam sit amet orci eget eros
            faucibus tincidunt. Vestibulum purus quam, scelerisque ut, mollis
            sed, nonummy id, metus.In hac habitasse platea dictumst. Etiam
            ultricies nisi vel augue. Pellentesque egestas, neque sit amet
            convallis pulvinar, justo nulla eleifend augue, ac auctor orci leo
            non est. Quisque rutrum. Duis leo.
          </p>
          <div className="block-quote">
            <p>
              “Pellentesque dapibus hendrerit tortor. Nam ipsum risus, rutrum
              vitae, vestibulum eu, molestie vel, lacus. Sed libero. Phasellus
              tempus. Etiam feugiat lorem non metus Maecenas vestibulum mollis
              diam. Pellentesque auctor neque nec urna. Pellentesque commodo
              eros a enim. Etiam sit amet orci eget eros faucibus tincidunt.”
            </p>
          </div>
          <p className="text">
            Curabitur blandit mollis lacus. Phasellus nec sem in justo
            pellentesque facilisis. Mauris turpis nunc, blandit et, volutpat
            molestie, porta ut, ligula. Fusce ac felis sit amet ligula pharetra
            condimentum. Integer tincidunt.
          </p>
          <div className="group-image">
            <div className="entry_image">
              <img
                src="/images/blog/blog-single-2.jpg"
                alt=""
                className="lazyload"
                width={1062}
                height={752}
              />
            </div>
            <div className="entry_image">
              <img
                src="/images/blog/blog-single-3.jpg"
                alt=""
                className="lazyload"
                width={1062}
                height={752}
              />
            </div>
          </div>
          <p className="text">
            Maecenas vestibulum mollis diam. Pellentesque auctor neque nec urna.
            Pellentesque commodo eros a enim. Etiam sit amet orci eget eros
            faucibus tincidunt. Vestibulum purus quam, scelerisque ut, mollis
            sed, nonummy id, metus.In hac habitasse platea dictumst. Etiam
            ultricies nisi vel augue. Pellentesque egestas, neque sit amet
            convallis pulvinar, justo nulla eleifend augue, ac auctor orci leo
            non est. Quisque rutrum. Duis leo.
          </p>
          <div className="bot">
            <div className="entry-tag">
              <p>Tag:</p>
              <ul className="style-list">
                <li>
                  <a href="#"> Lifestyle </a>
                </li>
                <li>
                  <a href="#"> Fashion </a>
                </li>
              </ul>
            </div>
            <div className="entry-social">
              <p>Share:</p>
              <ul className="tf-social-icon style-large">
                <li>
                  <a
                    href="https://www.facebook.com/"
                    className="social-item social-facebook"
                  >
                    <i className="icon icon-fb" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/"
                    className="social-item social-instagram"
                  >
                    <i className="icon icon-instagram" />
                  </a>
                </li>
                <li>
                  <a href="https://x.com/" className="social-item social-x">
                    <i className="icon icon-x" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.snapchat.com/"
                    className="social-item social-snapchat"
                  >
                    <i className="icon icon-snapchat" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="related-post">
            <a href="#" className="post prev">
              <div className="icon">
                <i className="icon-arr-left" />
              </div>
              <div className="text-wrap-left">
                <p>PREVIOUS POST</p>
                <p className="name-post">
                  5 Timeless Wardrobe Essentials Every Woman Should Own
                </p>
              </div>
            </a>
            <a href="#" className="post next">
              <div className="text-wrap-right">
                <p>NEXT POST</p>
                <p className="name-post">
                  10 Must-Have Accessories for Every Season
                </p>
              </div>
              <div className="icon">
                <i className="icon-arr-right2" />
              </div>
            </a>
          </div>
        </div>
        <div className="leave-comment-wrap">
          <p className="title">Leave a comment</p>
          <form className="form-default">
            <div className="wrap">
              <div className="cols">
                <fieldset>
                  <label htmlFor="username">Your name*</label>
                  <input id="username" type="text" name="username" required />
                </fieldset>
                <fieldset>
                  <label htmlFor="email">Your email*</label>
                  <input id="email" type="email" name="email" required />
                </fieldset>
              </div>
              <div className="cols">
                <fieldset className="textarea">
                  <label htmlFor="mess">Your comment*</label>
                  <textarea id="mess" required defaultValue={""} />
                </fieldset>
              </div>
              <p className="notice">
                Please note, your email won’t be published.
              </p>
              <div className="button-submit">
                <button className="tf-btn text-sm animate-btn" type="submit">
                  Post comment
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
