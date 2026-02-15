import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import note from "@/assets/images/illustration/note.png";
import successSubmit from "@/assets/images/illustration/success_quis.png";
import Image from "next/image";
import useSubmitQuis from "@/hooks/admin/useSubmitQuis";
import { useRouter } from "next/navigation";

export const TrainingReview = ({ data }) => {
  const [started, setStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const formData = data?.questionnaire_template?.form_data || [];

  const questionsOnly = formData.filter((item) => item.type !== "TITLE");

  const totalSteps = questionsOnly.length;
  const currentItem = questionsOnly[currentStep];
  const { mutate, isPending } = useSubmitQuis();
  const handleChange = (value) => {
    setAnswers((prev) => ({
      ...prev,
      [currentStep]: value,
    }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    const payload = {
      questionnaire_training_id: data?.questionnaire_training_id || 1, // sesuaikan kalau id-nya beda
      form_result: formData.map((item, index) => ({
        type: item.type,
        title: item.title || "",
        question: item.question || "",
        description: item.description || "",
        is_required: item.is_required || false,
        max_range_scale: item.max_range_scale || 0,
        options: item.options || [],
        answer:
          item.type === "TITLE"
            ? ""
            : answers[
                questionsOnly.findIndex(
                  (q) => q.question === item.question && q.type === item.type,
                )
              ]?.toString() || "",
      })),
    };

    console.log("SUBMIT PAYLOAD:", payload);

    mutate(payload, {
      onSuccess: (res) => {
        console.log("Submit success:", res);
        setAnswers({});
        setCurrentStep(0);
        setSubmitted(true);
      },
      onError: (err) => {
        console.error("Submit error:", err);
        alert("Gagal submit kuisioner");
      },
    });
  };

  const progressPercent = Math.round(((currentStep + 1) / totalSteps) * 100);
  useEffect(() => {
    if (data?.is_already_submit_questionnaire) {
      setSubmitted(true);
      setStarted(true); // optional, biar skip intro
    }
  }, [data]);
  return (
    <div className="flex ml-[320px] mt-16 flex-col flex-1 gap-6 py-6">
      <div className="flex flex-col rounded-md bg-white mx-6 p-8 overflow-hidden items-center min-h-[600px]">
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center text-center"
            >
              <Image
                src={successSubmit}
                alt="successSubmit"
                height={160}
                className="mx-auto object-cover"
              />

              <h2 className="text-xl font-semibold mt-8">
                Terima kasih atas ulasan Anda 🎉
              </h2>

              <p className="text-gray-500 mt-4 max-w-xl">
                Masukan Anda sangat berarti untuk peningkatan kualitas layanan
                dan materi pelatihan kami.
              </p>

              <button
                onClick={() => router.push("/dashboard/training")}
                className="mt-10 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                Kembali ke Dashboard
              </button>
            </motion.div>
          ) : !started ? (
            <motion.div
              key="intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center"
            >
              <Image
                src={note}
                alt="NOte"
                height={160}
                className="mx-auto object-cover"
              />

              <h2 className="text-xl font-semibold mt-8 text-center">
                Kuesioner Ulasan
              </h2>

              <p className="text-gray-500 mt-4 text-center max-w-xl">
                Untuk memperbaiki kualitas layanan kami, mohon berikan masukkan
                atau review dari pelayanan dan kualitas materi kami dengan
                mengisi kuesioner berikut. <br />
                Klik start untuk mulai mengisi kuesioner.
              </p>

              <button
                onClick={() => setStarted(true)}
                className="mt-10 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                Start
              </button>
            </motion.div>
          ) : (
            <div className="w-full flex flex-col flex-1 justify-between">
              {/* STATIC TITLE HEADER */}
              {formData.find((item) => item.type === "TITLE") && (
                <div className="w-full">
                  <h3 className="text-xl font-semibold text-left">
                    {formData.find((item) => item.type === "TITLE")?.title}
                  </h3>

                  {formData.find((item) => item.type === "TITLE")
                    ?.description && (
                    <p className="text-gray-500 text-left mt-3">
                      {
                        formData.find((item) => item.type === "TITLE")
                          ?.description
                      }
                    </p>
                  )}

                  {/* Divider */}
                  <div className="border-b mt-6" />
                </div>
              )}
              {/* QUESTION SECTION */}
              <div className="w-[700px] mx-auto relative min-h-[300px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.3 }}
                  >
                    {currentItem?.type === "LINEAR_SCALE" && (
                      <div className="mt-5 flex flex-col">
                        {/* 1. Nomor */}
                        <span className="w-10 h-10 flex items-center justify-center text-sm font-semibold text-blue-600 bg-blue-50 rounded-full mb-4">
                          {currentStep + 1}
                        </span>

                        {/* 2. TITLE */}
                        <h3 className="text-lg font-semibold mb-2">
                          {currentItem.title}
                        </h3>

                        {/* 3. DESCRIPTION */}
                        {currentItem.description && (
                          <p className="text-gray-500 mb-6">
                            {currentItem.description}
                          </p>
                        )}

                        {/* 4. Hardcode Text */}
                        <p className="text-sm font-medium text-gray-600 mb-4">
                          Choose the answer
                        </p>

                        {/* 5. Scale */}
                        <div className="flex gap-3 mb-3 w-full justify-center">
                          {Array.from(
                            { length: currentItem.max_range_scale },
                            (_, i) => i + 1,
                          ).map((num) => (
                            <button
                              key={num}
                              onClick={() => handleChange(num)}
                              className={`w-full h-12 rounded-lg border transition ${
                                answers[currentStep] === num
                                  ? "bg-blue-600 text-white border-blue-600"
                                  : "bg-white hover:bg-gray-50"
                              }`}
                            >
                              {num}
                            </button>
                          ))}
                        </div>

                        {/* 6. Label Scale */}
                        <div className="flex justify-between text-xs text-gray-500 w-full">
                          <span>
                            {currentItem.options?.[0]?.min_range_scale_label}
                          </span>
                          <span>
                            {currentItem.options?.[0]?.max_range_scale_label}
                          </span>
                        </div>
                      </div>
                    )}
                    {currentItem?.type === "OPTION" && (
                      <div className="mt-5">
                        <span className="w-10 h-10 flex items-center justify-center text-sm font-semibold text-blue-600 bg-blue-50 rounded-full mb-4">
                          {currentStep + 1}
                        </span>
                        <p className="font-medium mb-6 text-lg">
                          {currentItem.question}
                        </p>

                        <div className="flex flex-col gap-3">
                          {currentItem.options.map((opt, i) => (
                            <button
                              key={i}
                              onClick={() => handleChange(opt)}
                              className={`p-3 border rounded-md text-left transition ${
                                answers[currentStep] === opt
                                  ? "bg-blue-50 border-blue-600"
                                  : ""
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    {currentItem?.type === "TEXT" && (
                      <div className="mt-5">
                        <span className="w-10 h-10 flex items-center justify-center text-sm font-semibold text-blue-600 bg-blue-50 rounded-full mb-4">
                          {currentStep + 1}
                        </span>
                        <p className="font-medium mb-6 text-lg">
                          {currentItem.question}
                        </p>

                        <textarea
                          className="border rounded-md p-3 w-full"
                          rows={5}
                          placeholder="Tulis jawaban Anda..."
                          value={answers[currentStep] || ""}
                          onChange={(e) => handleChange(e.target.value)}
                        />
                      </div>
                    )}{" "}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* FOOTER NAVIGATION */}
              <div className="mt-12 flex justify-end items-center gap-6">
                {/* Progress kecil */}
                <div className="flex flex-col items-start gap-2">
                  <span className="text-xs text-gray-500 mt-1">
                    {progressPercent}% Completed
                  </span>
                  <div className="w-[200px] bg-gray-200 h-1.5 rounded-full">
                    <div
                      className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Arrow Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-200 hover:bg-gray-300 transition disabled:opacity-40"
                  >
                    ↑
                  </button>

                  {currentStep === totalSteps - 1 ? (
                    <button
                      onClick={handleSubmit}
                      disabled={isPending}
                      className="w-10 h-10 flex items-center justify-center rounded-lg bg-green-600 text-white hover:bg-green-700 transition disabled:opacity-50"
                    >
                      {isPending ? "..." : "✓"}
                    </button>
                  ) : (
                    <button
                      onClick={nextStep}
                      className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                    >
                      ↓
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
