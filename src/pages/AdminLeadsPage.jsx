import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

export default function AdminLeadsPage() {
  const navigate = useNavigate();

  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  // 📡 Fetch leads
  const fetchLeads = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API}/api/demo-requests`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch leads");
      }

      const data = await res.json();
      setLeads(data);

    } catch (err) {
      console.error("Error fetching leads:", err);
    } finally {
      setLoading(false);
    }
  };

  // 🔐 Protect route + fetch data
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/admin/login");
      return;
    }

    fetchLeads();
  }, []);

  // ⏳ Loading state
  if (loading) {
    return <div className="p-10">Loading leads...</div>;
  }

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">Leads</h1>

      {/* Empty state */}
      {leads.length === 0 && (
        <p className="text-gray-500">No leads yet.</p>
      )}

      {/* Leads list */}
      <div className="space-y-4">
        {leads.map((lead) => (
          <div key={lead.id} className="p-4 border rounded-lg shadow-sm">
            <p><strong>Name:</strong> {lead.name}</p>
            <p><strong>Email:</strong> {lead.email}</p>
            <p><strong>Company:</strong> {lead.company}</p>
            <p><strong>Industry:</strong> {lead.industry || "-"}</p>
            <p><strong>Message:</strong> {lead.message || "-"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}