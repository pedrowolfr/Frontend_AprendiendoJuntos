import { useState } from "react";
import "./Contact.css";
import emailjs from "@emailjs/browser";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaWhatsapp,
} from "react-icons/fa";

export const Contact = () => {
  const contactData = {
    title: "Contacto:",
    info: [
      {
        title: "Escuela Sevilla",
        subtitle:
          "Nuestra sede fisica es un espacio diseñado para fomentar el aprendizaje y la creatividad de los niños. Aquí, cada niño tiene la oportunidad de explorar su personalidad y descubrir su propia historia a través de actividades únicas y estimulantes.",
        address: {
          icon: <FaMapMarkerAlt />,
          name: "C. Puerto de la Molina, 3",
        },
        phone: {
          icon: <FaPhoneAlt />,
          number: "+34 777 88 99",
        },
        cel: {
          icon: <FaWhatsapp />,
          number: "+34 777 88 99",
        },
        email: {
          icon: <FaEnvelope />,
          address: "info@learningto.com",
        },
      },
    ],
    form: {
      name: "Nombre",
      email: "email",
      message: "mensajito",
      btnText: "Enviar",
    },
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();

    if (name === "" || email === "" || message === "") {
      toast.warning("Complete los campos");
      return;
    }

    emailjs
      .sendForm(
        "service_qevys6f",
        "template_sznblav",
        e.target,

        "WLNSKQkAGmFbiGO9Y"
      )
      .then((response) => {
        console.log("Email Enviado", response.status, response.text);
        setEmail("");
        setMessage("");
        setName("");
        toast.success("Email enviado");
      });
  };

  return (
    <div className="body">
      <div className="content-container">
        <div className="text-container">
          <h1 className="text-center mb-4">{contactData.title}</h1>
          <div>
            {contactData.info.map((item, i) => {
              const { title, subtitle, address, phone, email, cel } = item;

              return (
                <div key={i}>
                  <div className="custom-text">{title}</div>
                  <div className="mb-4">{subtitle}</div>
                  <div className="mb-5">
                    <div className="icon-ubi">
                      <div>{address.icon}</div>
                      <div className="info">{address.name}</div>
                    </div>
                    <div className="icon-ubi">
                      <div>{phone.icon}</div>
                      <div className="info">{phone.number}</div>
                    </div>
                    <div className="icon-ubi">
                      <div>{cel.icon}</div>
                      <div className="info">{cel.number}</div>
                    </div>
                    <div className="icon-ubi">
                      <div>{email.icon}</div>
                      <div className="info">{email.address}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <form onSubmit={sendEmail} className="form-container">
          <input
            type="text"
            value={name}
            name="from_name"
            onChange={(e) => setName(e.target.value)}
            placeholder={contactData.form.name}
            className="custom-input"
            style={{
              borderColor: "black",
              borderStyle: "solid",
              borderWidth: "0 0 1px 0",
            }}
          />
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={contactData.form.email}
            className="custom-input"
            style={{
              borderColor: "black",
              borderStyle: "solid",
              borderWidth: "0 0 1px 0",
            }}
          />
          <input
            type="text"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={contactData.form.message}
            className="custom-input"
            style={{
              borderColor: "black",
              borderStyle: "solid",
              borderWidth: "0 0 1px 0",
            }}
          />
          <button className="custom-button">{contactData.form.btnText}</button>
        </form>
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};
