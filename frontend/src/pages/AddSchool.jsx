import axios from "axios";
import { useForm } from "react-hook-form";
import "../css/AddSchools.css";

const AddSchool = () => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("address", data.address);
      formData.append("city", data.city);
      formData.append("state", data.state);
      formData.append("contact", data.contact);
      formData.append("email_id", data.email_id);
      formData.append("image", data.image[0]);

      await axios.post("http://localhost:5000/api/addSchool", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      alert("✅ School added successfully!");
      reset(); // clears form
    } catch (error) {
      console.error("❌ Upload Error:", error);
      alert(error.response?.data?.error || "Error adding school");
    }
  };

  return (
    <div className="form-container">
      <h2>Add a New School</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="form">

        <label>School Name</label>
        <input {...register("name", { required: true })} placeholder="Enter school name"/>
        {errors.name && <span className="error">Name is required</span>}

        <label>Address</label>
        <input {...register("address", { required: true })} placeholder="Enter address"/>

        <label>City</label>
        <input {...register("city", { required: true })} placeholder="Enter city"/>

        <label>State</label>
        <input {...register("state", { required: true })} placeholder="Enter state"/>

        <label>Contact</label>
        <input {...register("contact", { required: true, pattern: /^[0-9]+$/ })} placeholder="Enter contact number"/>
        {errors.contact && <span className="error">Contact must be a number</span>}

        <label>Email</label>
        <input type="email" {...register("email_id", { required: true })} placeholder="Enter email"/>
        {errors.email_id && <span className="error">Valid email required</span>}

        <label>Upload Image</label>
        <input type="file" accept="image/*" {...register("image", { required: true })}/>
        {errors.image && <span className="error">Image is required</span>}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AddSchool;
