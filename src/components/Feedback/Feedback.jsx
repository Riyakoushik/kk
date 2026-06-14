import { useState } from "react";
import { IoMdArrowForward, IoMdArrowBack } from "react-icons/io";
import { feedbackH1LG, feedbackReviewLG } from "../../constants/feedback";

import review1 from "../../assets/background1.png";
import review2 from "../../assets/background2.png";
import review3 from "../../assets/background3.png";

const reviewImages = {
    review1,
    review2,
    review3
};

const Feedback = () => {
    const [index, setIndex] = useState(0);
    const total = feedbackH1LG.length;

    const handleNext = () => {
        setIndex((prev) => (prev + 1) % total);
    };

    const handlePrev = () => {
        setIndex((prev) => (prev - 1 + total) % total);
    };

    const progressWidth = feedbackReviewLG[index][3];

    return (
        <section className='w-full min-h-screen p-8 md:p-24 flex flex-col justify-center items-center bg-black font-manrope select-none'>
            <div className='w-full max-w-[1600px] mx-auto text-left'>
                <p className='text-[14px] font-bold text-[#eae5dd] uppercase tracking-wider text-left'>
                    Do people like us?
                </p>

                <div className="min-h-[220px] md:min-h-[300px] flex items-center mt-6">
                    <h1 className='text-[#f4efe7] text-4xl md:text-7xl font-bold leading-tight tracking-tight uppercase'>
                        {feedbackH1LG[index].map((line, i) => (
                            <span key={i} className="block">
                                {line}
                            </span>
                        ))}
                    </h1>
                </div>

                <div className='flex items-center gap-4 mt-8'>
                    <img
                        src={reviewImages[feedbackReviewLG[index][2]]}
                        alt="review img"
                        className='w-16 h-16 rounded-full object-cover border border-white/10'
                    />
                    <p className="text-[#aca192] text-[14px] leading-relaxed uppercase tracking-wider">
                        <strong>{feedbackReviewLG[index][0]}</strong><br />
                        <span className="text-[12px] opacity-70">{feedbackReviewLG[index][1]}</span>
                    </p>
                </div>

                <div className="flex justify-between items-center mt-12 w-full">
                    <div className="flex gap-2">
                        <button
                            onClick={handlePrev}
                            className='border border-[#aaa090] p-2 hover:bg-[#aaa090]/10 rounded-full cursor-pointer transition-colors active:scale-95 flex items-center justify-center'
                            aria-label="Previous review"
                        >
                            <IoMdArrowBack className="text-[#f1ece4] w-6 h-6" />
                        </button>

                        <button
                            onClick={handleNext}
                            className='border border-[#aaa090] p-2 hover:bg-[#aaa090]/10 rounded-full cursor-pointer transition-colors active:scale-95 flex items-center justify-center'
                            aria-label="Next review"
                        >
                            <IoMdArrowForward className="text-[#f1ece4] w-6 h-6" />
                        </button>
                    </div>

                    <div className="relative w-48 md:w-72 h-[1px] bg-[#4f4b48]">
                        <div
                            className="progress-line absolute bg-[#f4efe7] h-[1px] top-1/2 -translate-y-1/2 left-0 transition-all duration-500 ease-out"
                            style={{ width: progressWidth }}
                        ></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Feedback;
