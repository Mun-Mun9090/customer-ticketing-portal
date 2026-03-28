import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NewTicket({ addTicket }) {

  const [formData, setFormData] = useState({
    title: "",
    customer: "",
    desc: ""
  });

  const [errors, setErrors] = useState({});
  const nav = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  function validate() {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required.";
    }

    if (!formData.customer.trim()) {
      newErrors.customer = "Customer name is required.";
    }

    if (!formData.desc.trim()) {
      newErrors.desc = "Description is required.";
    }

    return newErrors;
  }

  function submit(e) {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    addTicket(formData);
    nav("/");
  }

  return (
    <div className="container">
      <h2>Create Ticket</h2>

      <form
        onSubmit={submit}
        aria-label="Create Ticket Form"
        noValidate
      >

        {/* TITLE */}
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          aria-required="true"
          aria-invalid={errors.title ? "true" : "false"}
          aria-describedby={errors.title ? "title-error" : undefined}
        />
        {errors.title && (
          <p
            id="title-error"
            role="alert"
            style={{ color: "red" }}
          >
            {errors.title}
          </p>
        )}

        {/* CUSTOMER */}
        <label htmlFor="customer">Customer</label>
        <input
          id="customer"
          name="customer"
          value={formData.customer}
          onChange={handleChange}
          aria-required="true"
          aria-invalid={errors.customer ? "true" : "false"}
          aria-describedby={errors.customer ? "customer-error" : undefined}
        />
        {errors.customer && (
          <p
            id="customer-error"
            role="alert"
            style={{ color: "red" }}
          >
            {errors.customer}
          </p>
        )}

        {/* DESCRIPTION */}
        <label htmlFor="desc">Description</label>
        <textarea
          id="desc"
          name="desc"
          value={formData.desc}
          onChange={handleChange}
          aria-required="true"
          aria-invalid={errors.desc ? "true" : "false"}
          aria-describedby={errors.desc ? "desc-error" : undefined}
        />
        {errors.desc && (
          <p
            id="desc-error"
            role="alert"
            style={{ color: "red" }}
          >
            {errors.desc}
          </p>
        )}

        <button type="submit">
          Create Ticket
        </button>

      </form>
    </div>
  );
}