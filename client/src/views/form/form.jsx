import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getTeams, postDriver } from "../../redux/actions/actions";
import validations from "../../helpers/validations";
import style from './slyle/form.module.css';

const Form = () => {
  const teams = useSelector((state) => state.allTeams);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sortedTeams = teams
    .slice()
    .sort((a, b) => a.teamName.localeCompare(b.teamName));
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [formError, setFormError] = useState({});
  const [form, setForm] = useState({
    name: "",
    lastName: "",
    nationality: "",
    birthday: "",
    description: "",
    image: "",
    teams: [],
  });

  // const handleValidation = () => {
  //   const errors = validations(form);
  //   setFormError(errors);
  // };

  const handleFormData = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleTeamsChange = (event) => {
    const selectedTeamId = event.target.value;
    const selectedTeam = teams.find((team) => team.id === selectedTeamId);
    setSelectedTeams((prevSelectedTeams) => {
      if (prevSelectedTeams.some((team) => team.id === selectedTeamId)) {
        return prevSelectedTeams.filter((team) => team.id !== selectedTeamId);
      } else {
        return [...prevSelectedTeams, selectedTeam];
      }
    });
  };

  const handleRemoveTeam = (teamId) => {
    setSelectedTeams((prevSelectedTeams) => {
      return prevSelectedTeams.filter((id) => id !== teamId);
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const arrTeam = selectedTeams.map((team) => team.teamName);
    const teamsOk = arrTeam.join(", ");
    const newDriver = {
      forename: form.name,
      surname: form.lastName,
      description: form.description,
      image: form.image,
      nationality: form.nationality,
      birthday: form.birthday,
      teamName: teamsOk,
    };
    await postDriver(newDriver);
    if (newDriver === true) {
      navigate("/home");
    }
    console.log(newDriver, 'soy new drivers')
  };

  const disableButton = () => {
    let aux = true;

    if (Object.keys(formError).length === 0) {aux = false}
    return aux;
  };

  useEffect(() => {
    dispatch(getTeams());
  }, []);

  useEffect(() => {
    const teamsTransform = selectedTeams.map((teamId) => parseInt(teamId));
    setForm((prevForm) => ({ ...prevForm, teams: teamsTransform }));
  }, [selectedTeams]);

  // useEffect(() => {
  //   handleValidation();
  // }, [handleValidation]);

  useEffect(() => {
    const handleValidation = () => {
        const errors = validations(form);
        setFormError(errors);
    };

    handleValidation();
}, [form]);

  return (
    <div className={style.divForm}>
        <div className={style.textForm}>
          <h3>NEW DRIVER</h3>
        </div>

      <form className={style.form} onSubmit={handleSubmit}>


  <div>

        <div className={style.inputName}>
          <input type="text" name="name" onChange={handleFormData}/>
          {formError.name ? (<p className={style.error}>{formError.name}</p>) : (<p></p>)}
          <label>Name:</label>
        </div>

        <div className={style.inputName}>
          <input type="text" name="lastName" value={form.lastName} onChange={handleFormData}/>
          {formError.lastName ? (<p className={style.error}>{formError.lastName}</p>) : (<p></p>)}
          <label>Last name:</label>
        </div>

        <div className={style.inputName}>
          <input type="text" name="nationality" value={form.nationality} onChange={handleFormData}/>
          {formError.nationality ? (<p className={style.error}>{formError.nationality}</p>) : (<p></p>)}
          <label>Nationality:</label>
        </div>

        <div className={style.inputName}>
          <input type="date" name="birthday" value={form.birthday} onChange={handleFormData}/>
          {formError.birthday ? (<p className={style.error}>{formError.birthday}</p>) : (<p></p>)}
          <label>Date of Birth:</label>
        </div>
  </div>
  <div>

        <div  className={style.inputName}>
          <input type="text" name="image" value={form.image} onChange={handleFormData}/>
          {formError.image ? (<p className={style.error}>{formError.image}</p>) : (<p></p>)}
          <label>Image:</label>
        </div>

        <div  className={style.inputName}>
          <input type="text" name="description" value={form.description} onChange={handleFormData}/>
          <label>Description:</label>
        </div>

        <div className={style.selecrtAll}>
          <label className={style.selectText}>Equipos:</label>
          <select className={style.select} name="teams" id="" onChange={handleTeamsChange} value="">
            <option value="" disabled>Select a team{" "}</option>
            {sortedTeams.map((team) => (
            <option key={team.id} value={team.id}>
              {team.teamName}
            </option>
            ))}
          </select>
        
        
          {selectedTeams.map((teamId) => {
            const team = teams.find((elem) => elem.id == teamId.id);
            return (
              <div key={teamId} className={style.formCheckBox}>
                <button type="button" className={style.buttonForm} onClick={() => handleRemoveTeam(teamId)}>
                    X
                </button>
                <span className={style.teams}>{team?.teamName}</span>
              </div>
              );
            })}
          {formError.teams && <p className={style.error}>{formError.teams}</p>}
        </div>
  </div>

          {Object.values(formError).length === 0 && (
          <button className={style.buttonSubmit} disabled={disableButton()} type="submit">
            Create Driver{" "}
          </button>
        )}

      </form>
    </div>
  );
};

export default Form;
