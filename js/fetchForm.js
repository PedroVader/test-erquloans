document.addEventListener("DOMContentLoaded", () => {
    console.log("📦 Script cargado correctamente");
  
    const form = document.querySelector("form");
    if (!form) {
      console.warn("⚠️ No se encontró el formulario.");
      return;
    }
  
    console.log("✅ Formulario detectado");
  
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const fields = form.querySelectorAll("[data-jsf]");
      if (!fields.length) {
        console.warn("⚠️ No se encontraron campos con data-jsf.");
        return;
      }
  
      console.log(`📝 Se encontraron ${fields.length} campos con data-jsf`);
  
      const payload = {
        lp_campaign_id: "28846",
        lp_supplier_id: "86225",
        lp_key: "mmrvhjjdmuwdkj",
        user_agent: navigator.userAgent,
        landing_page_url: window.location.href,
      };
  
      fields.forEach((el) => {
        const key = el.getAttribute("data-jsf");
        if (!key) return;
  
        let value = "";
  
        if (
          el.tagName === "INPUT" ||
          el.tagName === "TEXTAREA" ||
          el.tagName === "SELECT"
        ) {
          if (el.type === "checkbox") {
            value = el.checked ? "1" : "0";
          } else {
            value = el.value;
          }
        } else {
          value = el.getAttribute("value") || el.textContent || "";
        }
  
        payload[key] = value.trim();
      });
  
      console.log("📤 Payload preparado:", payload);
  
      if (!payload.phone || !payload.first_name || !payload.date_of_birth) {
        alert("Faltan datos obligatorios (teléfono, nombre o fecha de nacimiento).");
        return;
      }
  
      try {
        const res = await fetch("https://api.leadprosper.io/direct_post", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams(payload).toString(),
        });
  
        const data = await res.json();
        console.log("✅ Lead enviado:", data);
      } catch (err) {
        console.error("❌ Error al enviar lead:", err);
      }
    });
  });
  