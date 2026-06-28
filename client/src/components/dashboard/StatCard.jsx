export default function StatCard({

    title,
    value,
    color

}) {

    return (

        <div className={`rounded-xl p-8 text-white ${color}`}>

            <h3 className="text-lg">

                {title}

            </h3>

            <p className="text-4xl font-bold mt-3">

                {value}

            </p>

        </div>

    );

}