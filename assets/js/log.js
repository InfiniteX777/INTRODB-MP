var tbody = document.getElementsByTagName("tbody")[0];
let loop_for, con;

function format_date(v) {
	var zero = "00";
	var ret =
		v.getFullYear() + "/" +
		(zero + (v.getMonth()+1)).slice(-2) + "/" +
		(zero + v.getDate()).slice(-2);

	return ret;
}

// Fancy.
function consecutive_query(i, list, res, callback) {
	if (i >= list.length) {
		callback(res);
	} else {
		con.query(list[i], (err, rows) => {
			if (!err) {
				res[res.length] = rows;
				i++;

				consecutive_query(i,list,res,callback);
			} else {
				console.log(err);
			}
		})
	}
}

function display() {
	tbody.innerHTML = "<tr>\
		<th>Scope<br>From/<br>To</th>\
		<th>New/Registered/<br>Active/Total<br>Accounts</th>\
		<th>New/Active/Total<br>Flights</th>\
		<th>Most<br>Visited/<br>Immigrant</th>\
		<th>Income</th>\
		</tr>";

	con.query("SELECT * FROM record", (err, rows) => {
		if (!err) {
			for (i = 0; i < rows.length; i++) {
				tbody.innerHTML += "<tr><td small>" +
					format_date(rows[i].scope_from) +
					"<br>" +
					format_date(rows[i].scope_to) +
					"</td><td>" +
					[rows[i].acc_new,rows[i].acc_reg,
					 rows[i].acc_act,rows[i].acc_all]
						.join("/") +
					"</td><td>" +
					[rows[i].fli_new,rows[i].fli_act,
					 rows[i].fli_all].join("/") +
					"</td><td>" +
					rows[i].visited + "/<br>" +
					rows[i].immigrant +
					"</td><td>" +
					rows[i].income +
					"<br>PHP</td></tr>";
			}

			tbody.innerHTML += "<tr><td><input type=date><br><input type=date required><br><input type=submit value=Generate></td></tr>";
			let input = tbody.getElementsByTagName("input");

			input[2].addEventListener("click", (event) => {
				if (!input[0].value || !input[1].value) {
					return;
				}

				consecutive_query(0,[
					// acc_new 0
					"SELECT COUNT(*) AS 'res'\
					FROM account a\
					WHERE\
						a.create >= \"" +
							input[0].value + "\" AND\
						a.create <= \"" +
							input[1].value + "\"",
					// acc_reg 1
					"SELECT COUNT(*) AS 'res'\
					FROM credential a\
					WHERE\
						a.create >= \"" +
							input[0].value + "\" AND\
						a.create <= \"" +
							input[1].value + "\"",
					// acc_act 2
					"SELECT COUNT(*) AS 'res'\
					FROM credential a\
					WHERE\
						a.last_log >= \"" +
							input[0].value + "\" AND\
						a.last_log <= \"" +
							input[1].value + "\"",
					// act_all 3
					"SELECT COUNT(*) AS 'res'\
					FROM account a\
					WHERE a.create <= \"" +
						input[1].value + "\"",
					// fli_new 4
					"SELECT COUNT(*) AS 'res'\
					FROM flight a\
					WHERE\
						a.create >= \"" +
							input[0].value + "\" AND\
						a.create <= \"" +
							input[1].value + "\"",
					// fli_act 5
					"SELECT COUNT(*) AS 'res' FROM (\
					SELECT COUNT(*)\
					FROM flight a, book b\
					WHERE\
						a.id = b.flight_id AND\
						a.create >= \"" +
							input[0].value + "\" AND\
						a.create <= \"" +
							input[1].value + "\"\
					GROUP BY a.id) a",
					// fli_all 6
					"SELECT COUNT(*) AS 'res'\
					FROM flight a\
					WHERE a.create <= \"" +
						input[1].value + "\"",
					// visited 7
					"SELECT COUNT(*), a.to\
					FROM flight a, book b\
					WHERE a.id = b.flight_id AND\
						a.create >= \"" +
							input[0].value + "\" AND\
						a.create <= \"" +
							input[1].value + "\"\
					GROUP BY a.id, a.to\
					ORDER BY 1 DESC LIMIT 1",
					// immigrant 8
					"SELECT COUNT(*), a.from\
					FROM flight a, book b\
					WHERE a.id = b.flight_id AND\
						a.create >= \"" +
							input[0].value + "\" AND\
						a.create <= \"" +
							input[1].value + "\"\
					GROUP BY a.id, a.from\
					ORDER BY 1 DESC LIMIT 1",
					// income 9
					"SELECT\
						SUM(b.cost) +\
						SUM(b.cost_tax) +\
						SUM(b.cost_flight_charge)\
						AS 'res'\
					FROM flight a, book b\
					WHERE\
						a.id = b.flight_id AND\
						a.depart >= \"" +
							input[0].value + "\" AND\
						a.depart <= \"" +
							input[1].value + "\""
				], [], (res) => {
					con.query(
						"INSERT INTO record (\
							scope_from, scope_to, acc_new,\
							acc_reg, acc_act, acc_all,\
							fli_new, fli_act, fli_all,\
							visited, immigrant, income\
							) VALUES (\"" +
								input[0].value + "\",\"" +
								input[1].value + "\"," +
								res[0][0].res + "," +
								res[1][0].res + "," +
								res[2][0].res + "," +
								res[3][0].res + "," +
								res[4][0].res + "," +
								res[5][0].res + "," +
								res[6][0].res + ",\"" +
								(!res[7][0] ? "None" :
								 res[7][0].to) +
									"\",\"" +
								(!res[8][0] ? "None" :
								 res[8][0].from) +
									"\"," +
								(res[9][0].res || 0) +
							")",
						(err) => {
						if (!err) {
							display();
						} else {
							console.log(err);
						}
					});
				})
			})
		}
	})
}

loop_for = function() {
	if (parent.connection) {
		con = parent.connection;

		display();
	} else {
		setTimeout(loop_for, 5000);
	}
}

loop_for();