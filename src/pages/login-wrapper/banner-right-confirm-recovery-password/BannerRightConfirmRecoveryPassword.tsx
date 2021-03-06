import { Grid, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useMutation } from 'react-query';
import { AxiosResponse, AxiosError } from 'axios';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router';
import ButtonLoadingSvgAnimated from '../../../components/styled-components/button-loading-svg-animated';
import { useSnackbar, ProviderContext } from 'notistack';
import { IRequestResponse } from '../../../interfaces/request-response.interface';
import { IConfirmRecoveryPassword } from '../../../interfaces/confirm-recovery-password-user.interface';
import {
  KeyIcon,
  HalfCardConfirmRecoveryPassword,
} from './BannerRightConfirmRecoveryPasswordStyles';
import { sendEmailConfirmRecoveryPassword } from '../../../services/users/user.service';
import { ITokenConfirmationRecoveryPassword } from '../../../interfaces/token-confirmation-recovery-password-param.interface';
import TallButton from '../../../components/styled-components/tall-button';
import CardTitle from '../../../components/styled-components/card-title';

const BannerRightConfirmRecoveryPassword = () => {
  const history = useHistory();
  const snackBar: ProviderContext = useSnackbar();
  const [{ token }] = useState<ITokenConfirmationRecoveryPassword>(useParams());
  const [mutateConfirmEmailRecoveryPassword, { isLoading }] = useMutation<
    AxiosResponse<IRequestResponse>,
    AxiosError<IRequestResponse>,
    IConfirmRecoveryPassword
  >(sendEmailConfirmRecoveryPassword, {
    onSuccess: (response: AxiosResponse<IRequestResponse>) => {
      snackBar.enqueueSnackbar(response.data.message, { variant: 'success' });
      redirectToLogin();
    },
    onError: (error: AxiosError<IRequestResponse>) => {
      snackBar.enqueueSnackbar(error.response?.data.message, {
        variant: 'error',
      });
    },
  });
  const redirectToLogin = () => {
    history.push('/');
  };
  const schema = Yup.object().shape({
    password: Yup.string().required('Necessário informar a senha'),
    confirm_password: Yup.string()
      .required('Necessário informar a confirmação da senha')
      .oneOf(
        [Yup.ref('password')],
        'Confirmação de senha deve ser igual a senha.'
      ),
  });

  const formik = useFormik({
    initialValues: {
      password: '',
      confirm_password: '',
    },
    validationSchema: schema,
    onSubmit: (changePasswordData: IConfirmRecoveryPassword) => {
      mutateConfirmEmailRecoveryPassword({
        ...changePasswordData,
        token: token,
      });
    },
  });

  return (
    <HalfCardConfirmRecoveryPassword>
      <CardTitle>Recuperação de senha</CardTitle>

      <KeyIcon />

      <form onSubmit={formik.handleSubmit} noValidate>
        <Grid spacing={3} container direction="row">
          <Grid item xs={12} md={12}>
            <TextField
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={formik.touched.password ? formik.errors.password : ''}
              error={formik.touched.password && Boolean(formik.errors.password)}
              id="recovery-user-password"
              name="password"
              type="password"
              fullWidth
              label="Senha"
              variant="filled"
            />
          </Grid>

          <Grid item md={12}>
            <TextField
              value={formik.values.confirm_password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={
                formik.touched.confirm_password
                  ? formik.errors.confirm_password
                  : ''
              }
              error={
                formik.touched.confirm_password &&
                Boolean(formik.errors.confirm_password)
              }
              id="recovery-user-confirm_password"
              name="confirm_password"
              fullWidth
              type="password"
              label="Confirmação de senha"
              variant="filled"
            />
          </Grid>

          <Grid item md={8}>
            <TallButton
              type="submit"
              fullWidth
              variant="contained"
              disabled={isLoading}
              color="primary"
            >
              {isLoading ? (
                <>
                  <ButtonLoadingSvgAnimated size={20} />
                  Carregando...
                </>
              ) : (
                'Alterar senha'
              )}
            </TallButton>
          </Grid>

          <Grid item md={4}>
            <TallButton variant="outlined" component={Link} to="/" fullWidth>
              Voltar
            </TallButton>
          </Grid>
        </Grid>
      </form>
    </HalfCardConfirmRecoveryPassword>
  );
};

export default BannerRightConfirmRecoveryPassword;
