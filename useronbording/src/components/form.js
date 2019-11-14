import React,{useState,useEffect} from 'react';
import {withFormik, Form, Field} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const LogInForm = ({values, errors, touched, status}) => {
    const [users,setUsers] = useState([]);
    useEffect(() =>{
        status && setUsers(users => [...users, status]);

    },[status]);

    return (
        <div>
        
        <Form>
            <Field type="text" name="user" placeholder="user name" />
            {touched.user && errors.user && (
                <p>{errors.user}</p>
            )}
            <Field type='text' name='email' placeholder="you email"  />
            {touched.email && errors.email && (
                <p>{errors.email}</p>
            )}
            <Field type='password' name='password' placeholder="password"/>
            {touched.password && errors.password && (
                <p>{errors.password}</p>
            )}
            <label name='tos'><Field type='checkbox' name="tos" checked={values.tos} /> : Terms of Service</label>
            {touched.tos && errors.tos && (
                <p>{errors.tos}</p>
            )}
            <button type="submit">Submit!</button>
        </Form>
            { users.map(users => (
                <div key={users.id}>
                    <h3>{users.name}</h3>
                    <ul>
                        <li>email: {users.email}</li>
                        <li>password {users.password}</li>
                        
                    </ul>
                </div>

                
            ))}
        </div>
        
    
    );


}
const FormikLogInForm = withFormik({
   mapPropsToValues({user, email, password, tos }){
        return {
   
            user: user || "",
            email: email || "",
            password: password || "",
            tos: tos || false


        };
   },
   validationSchema: Yup.object().shape({
       user: Yup.string().required(),
       email: Yup.string().email(),
       password: Yup.string().required(),
       tos: Yup.boolean().required()

       
      

   }),
   handleSubmit(values, {setStatus}){
        axios.post("https://reqres.in/api/users", values)
            .then(res => {
                setStatus(res.data);
                console.log(res);
            })
            .catch(err => console.log(err));
        }
    
})(LogInForm);


export default FormikLogInForm;
