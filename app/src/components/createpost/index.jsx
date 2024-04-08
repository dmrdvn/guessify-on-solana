import React, { useState } from "react";
import Button from "../button";
import { dateToUnix, ethToWei } from "../../utils/format";
import Loader from "../Loader";
import { createPost, getUserWallet } from "../../solanaApi"; // solanaApi.js'den fonksiyonları içe aktar

function CreatePost() {
  const [content, setContent] = useState("");
  const [betAmount, setBetAmount] = useState(0);
  const [dueDate, setDueDate] = useState("");
  const MAX_CONTENT_LENGTH = 600;

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;

    // Harf sınır kontrolü
    if (inputValue.length <= MAX_CONTENT_LENGTH) {
      setContent(inputValue);
    }
  };

  // Form gönderildiğinde çalışacak fonksiyon
  const handleSubmit = async (e) => {
    e.preventDefault(); // Formun varsayılan gönderme davranışını engelle
    try {
      const tx = await createPost(content, betAmount, dueDate);
      console.log("Post başarıyla oluşturuldu:", tx);
    } catch (error) {
      console.error("Post oluşturulurken hata oluştu:", error);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      {loading && <Loader />}
      <h3 className="text-[1.3rem] font-bold underline">Create a Prediction</h3>
      <p className="text-[.9rem]">
        To create your prediction;
        <br />
        - Give some details about your prediction.
        <br />
        - Enter the bet amount you placed for your prediction,
        <br />
        - Specify the final date about the prediction will come true.
        <br />
        <br />
        Submit and <span className="underline">wait 5-6 seconds</span> for your
        prediction to reach the blockchain network and close this form.
      </p>
      <div className="w-full">
        <textarea
          className="w-full p-2 border rounded-md text-black bg-gray-100"
          placeholder="Details of your Prediction - (eg. Bitcoin be above $ 50,000 on 31.12.2021?)"
          value={content}
          onChange={handleInputChange}
          rows={4}
        />
      </div>

      <div className="flex flex-row gap-2">
        <input
          type="number"
          className="w-1/2 p-2 border rounded-md text-black"
          placeholder="Bet Amount - (eg. 0.1 BNB)"
          value={betAmount}
          onChange={(e) => setBetAmount(e.target.value)}
        />
        <input
          type="datetime-local"
          className="w-1/2 p-2 border rounded-md text-black"
          placeholder="Deadline of Prediction"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>
      {submitted ? (
        <h3 className="text-[green]">
          Your prediction has been successfully created!
        </h3>
      ) : (
        <Button onClick={handleSubmit}>Create Prediction</Button>
      )}
    </div>
  );
}

export default CreatePost;
