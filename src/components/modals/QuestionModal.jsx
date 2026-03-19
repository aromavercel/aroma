"use client";

export default function QuestionModal() {
  return (
    <div
      className="modal modalCentered fade modal-ask-question popup-style-2"
      id="askQuestion"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <span className="title text-xl-2 fw-medium">Ask a Question</span>
            <span
              className="icon-close icon-close-popup"
              data-bs-dismiss="modal"
            />
          </div>
          <form
            className="form-ask-question"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="cols mb_15 flex-md-nowrap flex-wrap">
              <fieldset className="">
                <div className="text">Your name*</div>
                <input
                  type="text"
                  placeholder=""
                  className=""
                  name="text"
                  tabIndex={2}
                  defaultValue=""
                  aria-required="true"
                  required
                />
              </fieldset>
              <fieldset className="">
                <div className="text">Your phone number</div>
                <input
                  type="number"
                  placeholder=""
                  className=""
                  name="text"
                  tabIndex={2}
                  defaultValue=""
                  aria-required="true"
                />
              </fieldset>
            </div>
            <fieldset className="mb_15">
              <div className="text">Your email*</div>
              <input
                type="email"
                placeholder=""
                className=""
                name="text"
                tabIndex={2}
                defaultValue=""
                aria-required="true"
                required
              />
            </fieldset>
            <fieldset className="">
              <div className="text">Message*</div>
              <textarea
                name="message"
                rows={4}
                placeholder=""
                className=""
                tabIndex={2}
                aria-required="true"
                required
                defaultValue={""}
              />
            </fieldset>
            <div className="text-center">
              <button
                type="submit"
                className="tf-btn animate-btn d-inline-flex justify-content-center"
              >
                <span>Send Message</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
