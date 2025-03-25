export default function BreadLogo(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Bread loaf base */}
            <path
                d="M15,40 C15,25 30,15 50,15 C70,15 85,25 85,40 C85,55 75,70 50,70 C25,70 15,55 15,40 Z"
                fill="#e2c08c"
                stroke="#8b4513"
                strokeWidth="2"
            />
            {/* Bread crust top */}
            <path
                d="M20,38 C20,28 32,20 50,20 C68,20 80,28 80,38 C80,48 70,55 50,55 C30,55 20,48 20,38 Z"
                fill="#d4a76a"
                stroke="#8b4513"
                strokeWidth="1"
            />
            {/* Bread scoring lines */}
            <path
                d="M35,30 C40,35 45,38 50,38 C55,38 60,35 65,30"
                fill="none"
                stroke="#8b4513"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
            <path
                d="M30,40 C38,45 45,48 50,48 C55,48 62,45 70,40"
                fill="none"
                stroke="#8b4513"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
            {/* Wheat stalks */}
            <g transform="translate(50, 75) rotate(0)">
                <path
                    d="M0,0 L0,-15"
                    stroke="#8b4513"
                    strokeWidth="1.5"
                    fill="none"
                />
                <path
                    d="M0,-5 L5,-10 M0,-8 L-5,-13 M0,-11 L5,-16 M0,-14 L-5,-19"
                    stroke="#8b4513"
                    strokeWidth="1"
                    fill="none"
                />
            </g>
            <g transform="translate(40, 75) rotate(-10)">
                <path
                    d="M0,0 L0,-12"
                    stroke="#8b4513"
                    strokeWidth="1.5"
                    fill="none"
                />
                <path
                    d="M0,-4 L4,-8 M0,-6 L-4,-10 M0,-8 L4,-12"
                    stroke="#8b4513"
                    strokeWidth="1"
                    fill="none"
                />
            </g>
            <g transform="translate(60, 75) rotate(10)">
                <path
                    d="M0,0 L0,-12"
                    stroke="#8b4513"
                    strokeWidth="1.5"
                    fill="none"
                />
                <path
                    d="M0,-4 L4,-8 M0,-6 L-4,-10 M0,-8 L4,-12"
                    stroke="#8b4513"
                    strokeWidth="1"
                    fill="none"
                />
            </g>
        </svg>
    );
}
