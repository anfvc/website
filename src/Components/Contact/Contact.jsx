import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

function Contact({ mode }) {
  const formInitialDetails = {
    fullName: "",
    email: "",
    message: "",
  };
  const [formDetails, setFormDetails] = useState(formInitialDetails);

  function handleChange(e) {
    setFormDetails({ ...formDetails, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const serviceId = "service_dbs5cvj";
    const templateId = "template_mv2035u";
    const userId = "qRn3iEpbpvzwNq2gF";

    if (!formDetails.fullName || !formDetails.email || !formDetails.message) {
      toast.info("You need to fill in all the fields.");
      return;
    }

    const data = {
      service_id: serviceId,
      template_id: templateId,
      user_id: userId,
      template_params: {
        from_name: formDetails.fullName,
        from_email: formDetails.email,
        to_name: "Andrés",
        message: formDetails.message,
      },
    };

    try {
      const settings = {
        method: "POST",
        headers: {
          "Content-Type": "application/JSON",
        },
        body: JSON.stringify(data),
      };

      const response = await fetch(
        "https://api.emailjs.com/api/v1.0/email/send",
        settings
      );
      if (response.ok) {
        const data = await response.text();
        console.log(data);
        setFormDetails(formInitialDetails);
        toast.success("Thank you for your message.");
      } else {
        const error = await response.json();
        toast.error(
          error.message || "There was an error sending your message."
        );
      }
    } catch (error) {
      toast.error("Please refresh the page and try again.");
      setFormDetails(formInitialDetails);
    }
  }

  return (
    <section
      id="contact"
      className="w-full scroll-mt-20 pt-36 pb-36 overflow-x-hidden"
    >
      <div className="w-full flex flex-col px-10 gap-10 md:px-20 mx-auto max-w-screen-2xl">
        <div className="w-full flex justify-center">
          <h2 className="font-bold text-6xl">Contact</h2>
        </div>
        <div className="w-full flex flex-col gap-5 items-center justify-center text-5xl font-semibold">
          <div className="w-full flex flex-col items-center justify-center py-5">
            <h2 className="text-5xl text-center">Get in touch via email</h2>
          </div>
          <div className="w-full flex flex-col p-10 items-center justify-center gap-20 md:flex-row">
            <div className="w-full text-3xl font-normal leading-loose">
              I'd be delighted to hear from you! Whether you have a project
              idea, a collaboration opportunity, or just want to connect, feel
              free to drop me a message. I'm always open to exploring new ideas
              and exciting challenges in web development. Let's create something
              great together!
            </div>
            <div className="w-full">
              <form
                className={`w-full flex flex-col gap-3  font-normal text-4xl rounded-xl border ${
                  mode ? "border-white bg-black" : "border-black"
                } p-16`}
                onSubmit={handleSubmit}
              >
                <label htmlFor="fullName" className="font-bold py-4">
                  Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  className={`border ${
                    mode ? "bg-[#151515] text-white" : "border-black"
                  } rounded-xl p-3`}
                  onChange={handleChange}
                  value={formDetails.fullName}
                />
                <label htmlFor="email" className="font-bold py-4">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className={`border ${
                    mode ? "bg-[#151515] text-white" : "border-black"
                  } rounded-xl p-3`}
                  onChange={handleChange}
                  value={formDetails.email}
                />
                <label htmlFor="message" className="font-bold py-4">
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  className={`border ${
                    mode ? "bg-[#151515] text-white" : "border-black"
                  } rounded-xl p-3`}
                  onChange={handleChange}
                  value={formDetails.message}
                ></textarea>
                <div className="w-full flex mt-4">
                  <button
                    className={`w-full p-5 my-10 border rounded-xl ${
                      mode
                        ? "bg-[#151515] text-white active:bg-white active:text-black"
                        : " border-white bg-black text-white active:bg-white active:text-black active:border-black"
                    }`}
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
