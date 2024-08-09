import { newRequest } from "@/app/lib/actions";
import styles from "@/app/ui/dashboard/users/addUser/addUser.module.css";

const SendMoney = () => {
  return (
    <div className={styles.container}>
      <form action={newRequest} className={styles.form}>
        <input type="text" placeholder="Number" name="number" required />
        <input type="number" placeholder="Ammount" name="amount" required />
       
        <select name="service" id="service">
          <option value={false}>
           Service Name
          </option>
          <option value="bkash">bKash</option>
          <option value="nagad">Nagad</option>
          <option value="rocket">Rocket</option>
        </select>
       
        <textarea
          name="comments"
          id="comments"
          rows="2"
          placeholder="comments"
        ></textarea>
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default SendMoney;
