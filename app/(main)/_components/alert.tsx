// AlertBlock component

"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertOctagon } from "lucide-react";
import { useState } from "react";
import {Button} from "@/components/ui/button";

interface AlertBlockProps {
    showAlert: boolean;
    onClick: () => void;
}

const AlertBlock = ({showAlert, onClick }: AlertBlockProps) => {
    const [inputText, setInputText] = useState(""); // State to store the input text

    return (
        <div>
        {showAlert && (
            <div className="alert-wrapper mx-3 my-2">
                <Alert className="">
                    <AlertOctagon className="h-4 w-4"/>
                    <AlertTitle>Heads up!</AlertTitle>
                    <textarea
                        value={inputText}
                        onChange={e => setInputText(e.target.value)}
                        placeholder="Your daily reminder..."
                        className="text-input-class text-wrap bg-secondary mt-3" // Add your CSS class for styling
                    />
                    <button onClick={onClick} className="close-button">Close</button>
                </Alert>
            </div>
        )},
            {!showAlert &&
                <Button onClick={onClick} className=" toggle-alert-button mx-4 my-3 rounded-full transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg bg-gray-400 ">
                    Show Alert
                </Button>}
        </div>
    )
};

export default AlertBlock;
