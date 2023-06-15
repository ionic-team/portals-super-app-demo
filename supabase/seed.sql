INSERT INTO auth.users
(instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, invited_at, confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at, email_change_token_new, email_change, email_change_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at, phone, phone_confirmed_at, phone_change, phone_change_token, phone_change_sent_at, email_change_token_current, email_change_confirm_status, banned_until, reauthentication_token, reauthentication_sent_at)
VALUES
('00000000-0000-0000-0000-000000000000', '2881fea5-2f8e-478c-85c1-03077d0b41a8', 'authenticated', 'authenticated', 'jeremiah@supernova.com', '$2a$10$CHSailHGn33kys625wyba.ztJ23S/tCldwp1OUAnT6MXZ5WrJQFme', '2023-04-22 13:10:31.463703+00', NULL, '', NULL, '', '2023-04-22 13:10:03.275387+00', '', '', NULL, '2023-04-22 13:10:31.458239+00', '{"provider": "email", "providers": ["email"], "app_role": "contractor"}', '{}', NULL, '2022-10-04 03:41:27.391146+00', '2023-04-22 13:10:31.463703+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL);

INSERT INTO auth.identities
(id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at)
VALUES
('2881fea5-2f8e-478c-85c1-03077d0b41a8', '2881fea5-2f8e-478c-85c1-03077d0b41a8'::uuid, '{"sub": "2881fea5-2f8e-478c-85c1-03077d0b41a8", "email": "jeremiah@supernova.com"}', 'email', '2023-04-22 13:10:31.458239+00', '2022-10-04 03:41:27.391146+00', '2023-04-22 13:10:31.463703+00');

INSERT INTO auth.users
(instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, invited_at, confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at, email_change_token_new, email_change, email_change_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at, phone, phone_confirmed_at, phone_change, phone_change_token, phone_change_sent_at, email_change_token_current, email_change_confirm_status, banned_until, reauthentication_token, reauthentication_sent_at)
VALUES
('00000000-0000-0000-0000-000000000000', 'e7b98125-6d84-4b17-ad54-8e95e0b2a952', 'authenticated', 'authenticated', 'tanya@supernova.com', '$2a$10$CHSailHGn33kys625wyba.ztJ23S/tCldwp1OUAnT6MXZ5WrJQFme', '2023-04-22 13:10:31.463703+00', NULL, '', NULL, '', '2023-04-22 13:10:03.275387+00', '', '', NULL, '2023-04-22 13:10:31.458239+00', '{"provider": "email", "providers": ["email"], "app_role": "manager"}', '{}', NULL, '2022-10-04 03:41:27.391146+00', '2023-04-22 13:10:31.463703+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL);

INSERT INTO auth.identities
(id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at)
VALUES
('e7b98125-6d84-4b17-ad54-8e95e0b2a952', 'e7b98125-6d84-4b17-ad54-8e95e0b2a952'::uuid, '{"sub": "e7b98125-6d84-4b17-ad54-8e95e0b2a952", "email": "tanya@supernova.com"}', 'email', '2023-04-22 13:10:31.458239+00', '2022-10-04 03:41:27.391146+00', '2023-04-22 13:10:31.463703+00');

INSERT INTO auth.users
(instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, invited_at, confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at, email_change_token_new, email_change, email_change_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at, phone, phone_confirmed_at, phone_change, phone_change_token, phone_change_sent_at, email_change_token_current, email_change_confirm_status, banned_until, reauthentication_token, reauthentication_sent_at)
VALUES
('00000000-0000-0000-0000-000000000000', 'cbe724e3-3d97-48e1-a7f2-9eafbe6e35ab', 'authenticated', 'authenticated', 'jose@supernova.com', '$2a$10$CHSailHGn33kys625wyba.ztJ23S/tCldwp1OUAnT6MXZ5WrJQFme', '2023-04-22 13:10:31.463703+00', NULL, '', NULL, '', '2023-04-22 13:10:03.275387+00', '', '', NULL, '2023-04-22 13:10:31.458239+00', '{"provider": "email", "providers": ["email"], "app_role": "contractor"}', '{}', NULL, '2022-10-04 03:41:27.391146+00', '2023-04-22 13:10:31.463703+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL);

INSERT INTO auth.identities
(id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at)
VALUES
('cbe724e3-3d97-48e1-a7f2-9eafbe6e35ab', 'cbe724e3-3d97-48e1-a7f2-9eafbe6e35ab'::uuid, '{"sub": "cbe724e3-3d97-48e1-a7f2-9eafbe6e35ab", "email": "jose@supernova.com"}', 'email', '2023-04-22 13:10:31.458239+00', '2022-10-04 03:41:27.391146+00', '2023-04-22 13:10:31.463703+00');

INSERT INTO auth.users
(instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, invited_at, confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at, email_change_token_new, email_change, email_change_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at, phone, phone_confirmed_at, phone_change, phone_change_token, phone_change_sent_at, email_change_token_current, email_change_confirm_status, banned_until, reauthentication_token, reauthentication_sent_at)
VALUES
('00000000-0000-0000-0000-000000000000', '59ce5d8a-5cad-4658-9ae0-c8d335543201', 'authenticated', 'authenticated', 'trevor@supernova.com', '$2a$10$CHSailHGn33kys625wyba.ztJ23S/tCldwp1OUAnT6MXZ5WrJQFme', '2023-04-22 13:10:31.463703+00', NULL, '', NULL, '', '2023-04-22 13:10:03.275387+00', '', '', NULL, '2023-04-22 13:10:31.458239+00', '{"provider": "email", "providers": ["email"], "app_role": "sales"}', '{}', NULL, '2022-10-04 03:41:27.391146+00', '2023-04-22 13:10:31.463703+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL);

INSERT INTO auth.identities
(id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at)
VALUES
('59ce5d8a-5cad-4658-9ae0-c8d335543201', '59ce5d8a-5cad-4658-9ae0-c8d335543201'::uuid, '{"sub": "59ce5d8a-5cad-4658-9ae0-c8d335543201", "email": "trevor@supernova.com"}', 'email', '2023-04-22 13:10:31.458239+00', '2022-10-04 03:41:27.391146+00', '2023-04-22 13:10:31.463703+00');

INSERT INTO public.employees
(id, first_name, last_name, manager)
VALUES
('2881fea5-2f8e-478c-85c1-03077d0b41a8', 'Jeremiah', 'Cordova', 'e7b98125-6d84-4b17-ad54-8e95e0b2a952');

INSERT INTO public.employees
(id, first_name, last_name, role)
VALUES
('e7b98125-6d84-4b17-ad54-8e95e0b2a952', 'Tanya', 'Harding', 'manager');

INSERT INTO public.employees
(id, first_name, last_name, manager)
VALUES
('cbe724e3-3d97-48e1-a7f2-9eafbe6e35ab', 'Jose', 'Camacho', 'e7b98125-6d84-4b17-ad54-8e95e0b2a952');

INSERT INTO public.employees
(id, first_name, last_name, manager, role)
VALUES
('59ce5d8a-5cad-4658-9ae0-c8d335543201', 'Trevor', 'DeLaney', 'e7b98125-6d84-4b17-ad54-8e95e0b2a952', 'sales');

INSERT INTO public.apps
(id, name, appflow_id, role_access)
VALUES
('hr', 'Human Resources', 'abc123', array['contractor', 'manager']);

INSERT INTO public.apps
(id, name, appflow_id, role_access)
VALUES
('perks', 'People Perks', 'def456', array['contractor', 'manager', 'sales']);

INSERT INTO public.apps
(id, name, appflow_id, role_access)
VALUES
('time', 'Time Tracking', 'ghi789', array['contractor', 'manager']);

INSERT INTO public.apps
(id, name, appflow_id, role_access)
VALUES
('crm', 'Customer Relations', 'jkl012', array['sales']);

INSERT INTO public.perks
(created_at, giver, receiver, amount, reason)
VALUES
('2023-06-01 13:10:31.458239+00', '2881fea5-2f8e-478c-85c1-03077d0b41a8', '59ce5d8a-5cad-4658-9ae0-c8d335543201', 20, 'the CLI bug fix');

INSERT INTO public.perks
(created_at, giver, receiver, amount, reason)
VALUES
('2023-06-10 13:10:31.458239+00', 'cbe724e3-3d97-48e1-a7f2-9eafbe6e35ab', '2881fea5-2f8e-478c-85c1-03077d0b41a8', 50, 'writing great code');

INSERT INTO public.perks
(created_at, giver, receiver, amount, reason)
VALUES
('2023-06-12 13:10:31.458239+00', '59ce5d8a-5cad-4658-9ae0-c8d335543201', '2881fea5-2f8e-478c-85c1-03077d0b41a8', 100, 'being really nice');
