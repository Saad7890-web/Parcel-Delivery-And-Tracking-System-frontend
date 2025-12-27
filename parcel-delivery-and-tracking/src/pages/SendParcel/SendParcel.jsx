import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SERVICE_CENTER_RATE = {
  DHAKA: 50,
  CHITTAGONG: 70,
  SYLHET: 80,
};

export default function ParcelCreate() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const parcelType = watch("parcelType");

  const calculateCost = (data) => {
    let cost = SERVICE_CENTER_RATE[data.senderServiceCenter];
    if (data.parcelType === "NON_DOCUMENT" && data.weight) {
      cost += data.weight * 10;
    }
    return cost;
  };

  const onSubmit = (data) => {
    const cost = calculateCost(data);

    toast(
      <div className="space-y-2">
        <p className="font-semibold">
          Delivery Cost: <span className="text-primary">৳{cost}</span>
        </p>
        <button
          className="btn btn-primary btn-sm w-full"
          onClick={() => confirmSubmit(data, cost)}
        >
          Confirm
        </button>
      </div>,
      { autoClose: false }
    );
  };

  const confirmSubmit = (data, cost) => {
    const payload = {
      ...data,
      deliveryCost: cost,
      creation_date: new Date().toISOString(),
    };

    console.log("Saved to DB:", payload);

    toast.dismiss();
    toast.success("Parcel created successfully 🚚");
    reset();
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body space-y-4">
          <div>
            <h2 className="card-title text-2xl">Send a Parcel</h2>
            <p className="text-sm text-gray-500">
              Door to door parcel delivery
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* ================= Parcel Info ================= */}
            <div>
              <h3 className="font-semibold mb-2">Parcel Info</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <select
                  className="select select-bordered"
                  {...register("parcelType", { required: true })}
                >
                  <option value="">Parcel Type</option>
                  <option value="DOCUMENT">Document</option>
                  <option value="NON_DOCUMENT">Non-Document</option>
                </select>

                <input
                  className="input input-bordered"
                  placeholder="Parcel Title"
                  {...register("parcelTitle", { required: true })}
                />

                {parcelType === "NON_DOCUMENT" && (
                  <input
                    type="number"
                    className="input input-bordered"
                    placeholder="Weight (kg)"
                    {...register("weight")}
                  />
                )}
              </div>
            </div>

            <div className="divider" />

            {/* ================= Sender Info ================= */}
            <div>
              <h3 className="font-semibold mb-2">Sender Info</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  className="input input-bordered"
                  defaultValue="Saad Islam"
                  placeholder="Sender Name"
                  {...register("senderName", { required: true })}
                />

                <input
                  className="input input-bordered"
                  placeholder="Sender Contact"
                  {...register("senderContact", { required: true })}
                />

                <select
                  className="select select-bordered"
                  {...register("senderRegion", { required: true })}
                >
                  <option value="">Select Region</option>
                  <option value="DHAKA">Dhaka</option>
                  <option value="CHITTAGONG">Chittagong</option>
                  <option value="SYLHET">Sylhet</option>
                </select>

                <select
                  className="select select-bordered"
                  {...register("senderServiceCenter", { required: true })}
                >
                  <option value="">Select Service Center</option>
                  <option value="DHAKA">Dhaka Hub</option>
                  <option value="CHITTAGONG">Chittagong Hub</option>
                  <option value="SYLHET">Sylhet Hub</option>
                </select>

                <textarea
                  className="textarea textarea-bordered md:col-span-2"
                  placeholder="Pickup Address"
                  {...register("senderAddress", { required: true })}
                />

                <textarea
                  className="textarea textarea-bordered md:col-span-2"
                  placeholder="Pickup Instruction"
                  {...register("pickupInstruction", { required: true })}
                />
              </div>
            </div>

            <div className="divider" />

            {/* ================= Receiver Info ================= */}
            <div>
              <h3 className="font-semibold mb-2">Receiver Info</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  className="input input-bordered"
                  placeholder="Receiver Name"
                  {...register("receiverName", { required: true })}
                />

                <input
                  className="input input-bordered"
                  placeholder="Receiver Contact"
                  {...register("receiverContact", { required: true })}
                />

                <select
                  className="select select-bordered"
                  {...register("receiverRegion", { required: true })}
                >
                  <option value="">Select Region</option>
                  <option value="DHAKA">Dhaka</option>
                  <option value="CHITTAGONG">Chittagong</option>
                  <option value="SYLHET">Sylhet</option>
                </select>

                <select
                  className="select select-bordered"
                  {...register("receiverServiceCenter", { required: true })}
                >
                  <option value="">Select Service Center</option>
                  <option value="DHAKA">Dhaka Hub</option>
                  <option value="CHITTAGONG">Chittagong Hub</option>
                  <option value="SYLHET">Sylhet Hub</option>
                </select>

                <textarea
                  className="textarea textarea-bordered md:col-span-2"
                  placeholder="Delivery Address"
                  {...register("receiverAddress", { required: true })}
                />

                <textarea
                  className="textarea textarea-bordered md:col-span-2"
                  placeholder="Delivery Instruction"
                  {...register("deliveryInstruction", { required: true })}
                />
              </div>
            </div>

            <button className="btn btn-primary w-full">Submit Parcel</button>
          </form>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}
