document.addEventListener("DOMContentLoaded", () => {
  const endpoint = "https://jsonplaceholder.typicode.com/posts";

  const form = document.querySelector("form");
  const inputName = document.querySelector("input[type=text]");
  const inputEmail = document.querySelector("input[type=email]");
  const selection = document.querySelector("select");
  const textMessage = document.querySelector("textarea");

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    let errors = [];
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const enteredName = inputName.value.trim();
    const enteredEmail = inputEmail.value.trim();
    const enteredSelection = selection.value.trim();
    const enteredMessage = textMessage.value.trim();

    const request = {
      name: enteredName,
      email: enteredEmail,
      option: selection.value,
      msg: enteredMessage,
    };

    if (enteredName === "") {
      errors.push("لطفا نام خود را وارد کنید");
    }
    if (enteredEmail === "") {
      errors.push("لطفا ایمیل را وارد کنید");
    } else if (!emailPattern.test(enteredEmail)) {
      errors.push("فرمت ایمیل وارد شده معتبر نیست");
    }
    if (enteredSelection === "") {
      errors.push("لطفا موضوع را انتخاب کنید");
    }
    if (enteredMessage === "") {
      errors.push("لطفا پیام را وارد کنید");
    }

    if (errors.length > 0) {
      alert(errors.join("\n"));
    } else {
      /*OLD CODE
        fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`وضعیت پاسخ از سرور${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          alert("با موفقیت ارسال شد");
          form.reset();
          console.log("پاسخ سرور:", data);
        })
        .catch((err) => {
          alert("خطایی رخ داده است");
          console.error(err);
        }); */
      try {
        const result = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(request),
        });
        if (!result.ok) {
          throw new Error(`وضعیت پاسخ از سرور${res.status}`);
        }

        const res = await result.json();

        alert("با موفقیت ارسال شد");
        form.reset();
        console.log("پاسخ سرور:", data);
      } catch (err) {
        alert("خطایی رخ داده است");
        console.error(err);
      }
    }
  });

  const scrollTop = document.querySelector(".footer-scroll-top");
  scrollTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  const tabs = document.querySelectorAll("#main-navbar .tab");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("tabhover"));
      tab.classList.add("tabhover");
    });
  });
});
