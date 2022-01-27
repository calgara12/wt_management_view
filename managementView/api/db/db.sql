--
-- PostgreSQL database dump
--

-- Dumped from database version 11.7
-- Dumped by pg_dump version 13.4

-- Started on 2022-01-27 18:35:33

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

--
-- TOC entry 199 (class 1259 OID 16530)
-- Name: categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    name character varying(30) NOT NULL,
    type_id integer NOT NULL
);


ALTER TABLE public.categories OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 16651)
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.categories ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.categories_id_seq
    START WITH 15
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 201 (class 1259 OID 16536)
-- Name: menu_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.menu_items (
    id integer NOT NULL,
    title character varying(50) NOT NULL,
    description character varying(200) NOT NULL,
    price double precision NOT NULL,
    category_ids integer[],
    allergens "char"[]
);


ALTER TABLE public.menu_items OWNER TO postgres;

--
-- TOC entry 203 (class 1259 OID 16654)
-- Name: menu_items_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.menu_items ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.menu_items_id_seq
    START WITH 3
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 198 (class 1259 OID 16527)
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    id integer NOT NULL,
    name character varying(30) NOT NULL
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- TOC entry 196 (class 1259 OID 16521)
-- Name: tables; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tables (
    id integer NOT NULL,
    seats integer NOT NULL,
    location character varying(100) NOT NULL
);


ALTER TABLE public.tables OWNER TO postgres;

--
-- TOC entry 204 (class 1259 OID 16656)
-- Name: tables_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.tables ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.tables_id_seq
    START WITH 3
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 200 (class 1259 OID 16533)
-- Name: type; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.type (
    id integer NOT NULL,
    name character varying(30) NOT NULL
);


ALTER TABLE public.type OWNER TO postgres;

--
-- TOC entry 197 (class 1259 OID 16524)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    role_id integer NOT NULL,
    username character varying(25) NOT NULL,
    password character varying(25) NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 205 (class 1259 OID 16658)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_id_seq
    START WITH 5
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 2850 (class 0 OID 16530)
-- Dependencies: 199
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categories (id, name, type_id) FROM stdin;
3	alcoholic drink	2
4	soft drink	2
5	special	3
6	wheat product	1
7	meat	1
8	vegetarian meat	1
9	fish	1
10	seafood	1
2	vegetable	1
11	dessert	3
\.


--
-- TOC entry 2852 (class 0 OID 16536)
-- Dependencies: 201
-- Data for Name: menu_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.menu_items (id, title, description, price, category_ids, allergens) FROM stdin;
2	new title	new description	10.8000000000000007	{1,2,3}	{R,F}
1	spaghetti and meatballs	hello	10.8000000000000007	{6,7,8}	{A,B,C}
\.


--
-- TOC entry 2849 (class 0 OID 16527)
-- Dependencies: 198
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles (id, name) FROM stdin;
1	management
2	waiter
3	kitchen
\.


--
-- TOC entry 2847 (class 0 OID 16521)
-- Dependencies: 196
-- Data for Name: tables; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tables (id, seats, location) FROM stdin;
1	4	left
2	8	right
\.


--
-- TOC entry 2851 (class 0 OID 16533)
-- Dependencies: 200
-- Data for Name: type; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.type (id, name) FROM stdin;
1	food
2	beverage
3	special
\.


--
-- TOC entry 2848 (class 0 OID 16524)
-- Dependencies: 197
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, role_id, username, password) FROM stdin;
1	1	user1	user1
3	3	user3	user3
4	1	user4	user4
2	2	user2	user2
\.


--
-- TOC entry 2862 (class 0 OID 0)
-- Dependencies: 202
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categories_id_seq', 15, true);


--
-- TOC entry 2863 (class 0 OID 0)
-- Dependencies: 203
-- Name: menu_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.menu_items_id_seq', 3, false);


--
-- TOC entry 2864 (class 0 OID 0)
-- Dependencies: 204
-- Name: tables_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tables_id_seq', 3, false);


--
-- TOC entry 2865 (class 0 OID 0)
-- Dependencies: 205
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 5, false);


--
-- TOC entry 2719 (class 2606 OID 16569)
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- TOC entry 2723 (class 2606 OID 16617)
-- Name: menu_items menu_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.menu_items
    ADD CONSTRAINT menu_items_pkey PRIMARY KEY (id);


--
-- TOC entry 2717 (class 2606 OID 16551)
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- TOC entry 2713 (class 2606 OID 16561)
-- Name: tables tables_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tables
    ADD CONSTRAINT tables_pkey PRIMARY KEY (id);


--
-- TOC entry 2721 (class 2606 OID 16610)
-- Name: type type_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.type
    ADD CONSTRAINT type_pkey PRIMARY KEY (id);


--
-- TOC entry 2715 (class 2606 OID 16546)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 2724 (class 2606 OID 16552)
-- Name: users role_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT role_id FOREIGN KEY (role_id) REFERENCES public.roles(id) NOT VALID;


--
-- TOC entry 2725 (class 2606 OID 16611)
-- Name: categories type_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT type_id FOREIGN KEY (type_id) REFERENCES public.type(id) NOT VALID;


-- Completed on 2022-01-27 18:35:33

--
-- PostgreSQL database dump complete
--

