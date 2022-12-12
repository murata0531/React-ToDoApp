import axios from "axios";
import { useEffect, useState } from "react";

type Sample = {
    id: number;
    message: string;
}

export default function Sample() {
    const [samples, setSamples] = useState<[] | Sample[]>([]);
    useEffect(() => {
      axios
        .get("http://localhost:8000/api/getSample")
        .then((response) => setSamples(response.data))
        .catch((error) => console.log(error));
    }, []);
  
    const [message, setMessage] = useState<[] | string>("");
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setMessage(e.target.value);
    };

    return (
        <>
            <ul>
                {samples.map((sample: Sample) => (
                    <li key={sample.id.toString()}>
                        {sample.message}
                    </li>
                ))}
            </ul>
      </>
    );
};
  