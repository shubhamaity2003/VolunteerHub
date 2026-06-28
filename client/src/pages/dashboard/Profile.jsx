import { useEffect, useState } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import api from "../../services/api";

export default function Profile() {

  const [user, setUser] = useState(null);

  useEffect(() => {

    fetchProfile();

  }, []);

  const fetchProfile = async () => {

    try {

      const res = await api.get("/users/profile");

      setUser(res.data.user);

    } catch (err) {

      console.log(err);

    }

  };

  if (!user) {

    return (
      <DashboardLayout>

        <div className="text-center text-xl">

          Loading...

        </div>

      </DashboardLayout>
    );

  }

  return (

    <DashboardLayout>

      <div className="max-w-3xl mx-auto">

        <div className="bg-white rounded-xl shadow-lg p-8">

          <div className="flex items-center gap-6">

            <img
              src="https://i.pravatar.cc/120"
              alt="Profile"
              className="rounded-full w-28 h-28"
            />

            <div>

              <h1 className="text-3xl font-bold">

                {user.name}

              </h1>

              <p className="text-gray-500">

                {user.email}

              </p>

              <span className="inline-block mt-3 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full">

                {user.role}

              </span>

            </div>

          </div>

        </div>

      </div>

    </DashboardLayout>

  );

}