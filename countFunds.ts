import { NEAR } from "near-units";
import { Pool } from "pg";


async function main() {
  let pool = new Pool({ connectionString: "postgres://public_readonly:nearprotocol@104.199.89.51/mainnet_explorer"})
  let query = "select * from action_receipt_actions where receipt_receiver_account_id = 'kukumo.near' AND receipt_included_in_block_timestamp < 1643312136987959504;"
  const {rows } = await pool.query(query);
  console.log(rows.map(r => NEAR.from(r.args.deposit)).reduce((acc, curr) => acc.add(curr), NEAR.from(0)).toHuman());
}

void main();

