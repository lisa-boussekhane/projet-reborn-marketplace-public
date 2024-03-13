--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3 (Ubuntu 15.3-1.pgdg20.04+1)
-- Dumped by pg_dump version 15.3 (Ubuntu 15.3-1.pgdg20.04+1)

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

SET default_table_access_method = heap;

--
-- Name: User_Discuss_Message; Type: TABLE; Schema: public; Owner: aar
--

CREATE TABLE public."User_Discuss_Message" (
    id integer NOT NULL,
    user1_id integer NOT NULL,
    user2_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."User_Discuss_Message" OWNER TO aar;

--
-- Name: User_Discuss_Message_id_seq; Type: SEQUENCE; Schema: public; Owner: aar
--

ALTER TABLE public."User_Discuss_Message" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."User_Discuss_Message_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: User_Order_Product; Type: TABLE; Schema: public; Owner: aar
--

CREATE TABLE public."User_Order_Product" (
    id integer NOT NULL,
    product_id integer NOT NULL,
    seller_id integer NOT NULL,
    buyer_id integer NOT NULL,
    date timestamp with time zone NOT NULL,
    invoice character varying,
    status character varying(100) NOT NULL,
    order_number text,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."User_Order_Product" OWNER TO aar;

--
-- Name: User_Order_Product_id_seq; Type: SEQUENCE; Schema: public; Owner: aar
--

ALTER TABLE public."User_Order_Product" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."User_Order_Product_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: User_Rate_Shop; Type: TABLE; Schema: public; Owner: aar
--

CREATE TABLE public."User_Rate_Shop" (
    id integer NOT NULL,
    rating integer,
    user_id integer NOT NULL,
    shop_id integer NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT rating_check CHECK (((rating >= 1) AND (rating <= 5)))
);


ALTER TABLE public."User_Rate_Shop" OWNER TO aar;

--
-- Name: User_Rate_Shop_id_seq; Type: SEQUENCE; Schema: public; Owner: aar
--

ALTER TABLE public."User_Rate_Shop" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."User_Rate_Shop_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: detail_product; Type: TABLE; Schema: public; Owner: aar
--

CREATE TABLE public.detail_product (
    id integer NOT NULL,
    localization character varying(50) NOT NULL,
    belly_plate character varying(5) NOT NULL,
    gender character varying(20) NOT NULL,
    year integer NOT NULL,
    eyes character varying(100) NOT NULL,
    hair character varying(100) NOT NULL,
    description character varying(600) NOT NULL,
    status character varying(50) NOT NULL,
    product_id integer NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.detail_product OWNER TO aar;

--
-- Name: detail_product_id_seq; Type: SEQUENCE; Schema: public; Owner: aar
--

ALTER TABLE public.detail_product ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.detail_product_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: media; Type: TABLE; Schema: public; Owner: aar
--

CREATE TABLE public.media (
    id integer NOT NULL,
    photo character varying NOT NULL,
    video character varying,
    product_id integer NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.media OWNER TO aar;

--
-- Name: media_id_seq; Type: SEQUENCE; Schema: public; Owner: aar
--

ALTER TABLE public.media ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.media_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: message; Type: TABLE; Schema: public; Owner: aar
--

CREATE TABLE public.message (
    id integer NOT NULL,
    content character varying(200) NOT NULL,
    sender_id integer NOT NULL,
    receiver_id integer NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    discussion_id integer NOT NULL
);


ALTER TABLE public.message OWNER TO aar;

--
-- Name: message_id_seq; Type: SEQUENCE; Schema: public; Owner: aar
--

ALTER TABLE public.message ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.message_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: product; Type: TABLE; Schema: public; Owner: aar
--

CREATE TABLE public.product (
    id integer NOT NULL,
    unique_id character varying(6) NOT NULL,
    title character varying(100) NOT NULL,
    kit_name character varying(20) NOT NULL,
    sculptor character varying(50) NOT NULL,
    size integer NOT NULL,
    type character varying(100) NOT NULL,
    weight integer NOT NULL,
    age_range character varying(100) NOT NULL,
    authenticity_card character varying(5) NOT NULL,
    price integer NOT NULL,
    shipping_fees integer,
    sold boolean DEFAULT false NOT NULL,
    user_id integer NOT NULL,
    shop_id integer NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.product OWNER TO aar;

--
-- Name: product_id_seq; Type: SEQUENCE; Schema: public; Owner: aar
--

ALTER TABLE public.product ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.product_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: shop; Type: TABLE; Schema: public; Owner: aar
--

CREATE TABLE public.shop (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    user_id integer NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.shop OWNER TO aar;

--
-- Name: shop_id_seq; Type: SEQUENCE; Schema: public; Owner: aar
--

ALTER TABLE public.shop ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.shop_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: user; Type: TABLE; Schema: public; Owner: aar
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    first_name character varying(128) NOT NULL,
    last_name character varying(128) NOT NULL,
    username character varying(128),
    email character varying(128) NOT NULL,
    password character varying(128) NOT NULL,
    date_of_birth timestamp with time zone,
    phone character varying(11),
    address character varying(128),
    zip_code character varying(9),
    city character varying(128),
    country character varying(128),
    state character varying(128),
    role character varying(128),
    pro character varying(12),
    duns integer,
    password_token character varying(255),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."user" OWNER TO aar;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: aar
--

ALTER TABLE public."user" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: User_Discuss_Message; Type: TABLE DATA; Schema: public; Owner: aar
--

COPY public."User_Discuss_Message" (id, user1_id, user2_id, created_at, updated_at) FROM stdin;
1	2	1	2024-03-08 22:59:54.829609	2024-03-08 22:59:54.829609+01
2	8	1	2024-03-08 22:12:56.458	2024-03-08 23:12:56.458+01
3	9	8	2024-03-08 23:14:11.404	2024-03-09 00:14:11.404+01
\.


--
-- Data for Name: User_Order_Product; Type: TABLE DATA; Schema: public; Owner: aar
--

COPY public."User_Order_Product" (id, product_id, seller_id, buyer_id, date, invoice, status, order_number, created_at, updated_at) FROM stdin;
1	1	3	2	2024-02-10 00:00:00+01	\N	Send	1	2024-03-08 22:59:54.829609+01	2024-03-08 22:59:54.829609+01
2	2	1	2	2024-01-27 00:00:00+01	\N	Delivered	2	2024-03-08 22:59:54.829609+01	2024-03-08 22:59:54.829609+01
3	3	1	3	2024-02-13 00:00:00+01	\N	Paid	3	2024-03-08 22:59:54.829609+01	2024-03-08 22:59:54.829609+01
4	8	3	2	2024-02-10 00:00:00+01	\N	Send	4	2024-03-08 22:59:54.829609+01	2024-03-08 22:59:54.829609+01
6	14	8	9	2024-03-09 00:13:50.108+01	\N	Paid	54136	2024-03-09 00:13:50.109+01	2024-03-09 00:13:50.109+01
7	1	3	8	2024-03-12 19:21:40.162+01	\N	Paid	76124	2024-03-12 19:21:40.164+01	2024-03-12 19:21:40.164+01
8	2	1	8	2024-03-12 19:22:45.059+01	\N	Paid	03107	2024-03-12 19:22:45.06+01	2024-03-12 19:22:45.06+01
9	3	1	8	2024-03-12 19:23:27.56+01	\N	Paid	38527	2024-03-12 19:23:27.561+01	2024-03-12 19:23:27.561+01
\.


--
-- Data for Name: User_Rate_Shop; Type: TABLE DATA; Schema: public; Owner: aar
--

COPY public."User_Rate_Shop" (id, rating, user_id, shop_id, created_at, updated_at) FROM stdin;
1	4	2	2	2024-03-08 22:59:54.829609+01	2024-03-08 22:59:54.829609+01
2	3	2	1	2024-03-08 22:59:54.829609+01	2024-03-08 22:59:54.829609+01
3	5	2	2	2024-03-08 22:59:54.829609+01	2024-03-08 22:59:54.829609+01
4	3	2	1	2024-03-08 22:59:54.829609+01	2024-03-08 22:59:54.829609+01
6	4	2	1	2024-03-08 22:59:54.829609+01	2024-03-08 22:59:54.829609+01
7	5	2	1	2024-03-08 22:59:54.829609+01	2024-03-08 22:59:54.829609+01
8	2	2	2	2024-03-08 22:59:54.829609+01	2024-03-08 22:59:54.829609+01
10	4	2	1	2024-03-08 22:59:54.829609+01	2024-03-08 22:59:54.829609+01
11	3	2	1	2024-03-08 22:59:54.829609+01	2024-03-08 22:59:54.829609+01
12	4	2	1	2024-03-08 22:59:54.829609+01	2024-03-08 22:59:54.829609+01
\.


--
-- Data for Name: detail_product; Type: TABLE DATA; Schema: public; Owner: aar
--

COPY public.detail_product (id, localization, belly_plate, gender, year, eyes, hair, description, status, product_id, created_at, updated_at) FROM stdin;
1	Atlanta	No	None	2023	Blue	Brown	Fully filled with high-quality platinum liquid silicone, there is no better way to give a realistic effect to your reborn baby. Soft to the touch, you will feel like Lucie is a real newborn. Lucie is a hand-painted reborn baby girl, however, this does not prevent her from being put in water at normal temperature. Fully articulated thanks to the silicone filled completely in its limbs, from head to feet.	Resell	1	2024-03-08 22:59:54.829609+01	2024-03-08 22:59:54.829609+01
2	New York	Yes	Boy	2024	Brown	Black	Fully filled with high-quality platinum liquid silicone, there is no better way to give a realistic effect to your reborn baby. Soft to the touch, you will feel like Lucie is a real newborn. Lucie is a hand-painted reborn baby girl, however, this does not prevent her from being put in water at normal temperature. Fully articulated thanks to the silicone filled completely in its limbs, from head to feet.	New	2	2024-03-08 22:59:54.829609+01	2024-03-08 22:59:54.829609+01
3	New York	No	Girl	2022	Blue	Brown	Fully filled with high-quality platinum liquid silicone, there is no better way to give a realistic effect to your reborn baby. Soft to the touch, you will feel like Lucie is a real newborn. Lucie is a hand-painted reborn baby girl, however, this does not prevent her from being put in water at normal temperature. Fully articulated thanks to the silicone filled completely in its limbs, from head to feet.	New	3	2024-03-08 22:59:54.829609+01	2024-03-08 22:59:54.829609+01
4	New York	No	Girl	2023	Closed	Brown	Fully filled with high-quality platinum liquid silicone, there is no better way to give a realistic effect to your reborn baby. Soft to the touch, you will feel like Lucie is a real newborn. Lucie is a hand-painted reborn baby girl, however, this does not prevent her from being put in water at normal temperature. Fully articulated thanks to the silicone filled completely in its limbs, from head to feet.	New	4	2024-03-08 22:59:54.829609+01	2024-03-08 22:59:54.829609+01
5	Atlanta	No	None	2023	Blue	Brown	Fully filled with high-quality platinum liquid silicone, there is no better way to give a realistic effect to your reborn baby. Soft to the touch, you will feel like Lucie is a real newborn. Lucie is a hand-painted reborn baby girl, however, this does not prevent her from being put in water at normal temperature. Fully articulated thanks to the silicone filled completely in its limbs, from head to feet.	Resell	5	2024-03-08 22:59:54.829609+01	2024-03-08 22:59:54.829609+01
6	New York	Yes	Boy	2024	Brown	Black	Fully filled with high-quality platinum liquid silicone, there is no better way to give a realistic effect to your reborn baby. Soft to the touch, you will feel like Lucie is a real newborn. Lucie is a hand-painted reborn baby girl, however, this does not prevent her from being put in water at normal temperature. Fully articulated thanks to the silicone filled completely in its limbs, from head to feet.	New	6	2024-03-08 22:59:54.829609+01	2024-03-08 22:59:54.829609+01
7	New York	No	Girl	2022	Blue	Brown	Fully filled with high-quality platinum liquid silicone, there is no better way to give a realistic effect to your reborn baby. Soft to the touch, you will feel like Lucie is a real newborn. Lucie is a hand-painted reborn baby girl, however, this does not prevent her from being put in water at normal temperature. Fully articulated thanks to the silicone filled completely in its limbs, from head to feet.	New	7	2024-03-08 22:59:54.829609+01	2024-03-08 22:59:54.829609+01
8	New York	No	Girl	2023	Closed	Brown	Fully filled with high-quality platinum liquid silicone, there is no better way to give a realistic effect to your reborn baby. Soft to the touch, you will feel like Lucie is a real newborn. Lucie is a hand-painted reborn baby girl, however, this does not prevent her from being put in water at normal temperature. Fully articulated thanks to the silicone filled completely in its limbs, from head to feet.	New	8	2024-03-08 22:59:54.829609+01	2024-03-08 22:59:54.829609+01
9	Atlanta	No	None	2023	Blue	Brown	Fully filled with high-quality platinum liquid silicone, there is no better way to give a realistic effect to your reborn baby. Soft to the touch, you will feel like Lucie is a real newborn. Lucie is a hand-painted reborn baby girl, however, this does not prevent her from being put in water at normal temperature. Fully articulated thanks to the silicone filled completely in its limbs, from head to feet.	Resell	9	2024-03-08 22:59:54.829609+01	2024-03-08 22:59:54.829609+01
10	New York	Yes	Boy	2024	Brown	Black	Fully filled with high-quality platinum liquid silicone, there is no better way to give a realistic effect to your reborn baby. Soft to the touch, you will feel like Lucie is a real newborn. Lucie is a hand-painted reborn baby girl, however, this does not prevent her from being put in water at normal temperature. Fully articulated thanks to the silicone filled completely in its limbs, from head to feet.	New	10	2024-03-08 22:59:54.829609+01	2024-03-08 22:59:54.829609+01
11	New York	No	Girl	2022	Blue	Brown	Fully filled with high-quality platinum liquid silicone, there is no better way to give a realistic effect to your reborn baby. Soft to the touch, you will feel like Lucie is a real newborn. Lucie is a hand-painted reborn baby girl, however, this does not prevent her from being put in water at normal temperature. Fully articulated thanks to the silicone filled completely in its limbs, from head to feet.	New	11	2024-03-08 22:59:54.829609+01	2024-03-08 22:59:54.829609+01
12	New York	No	Girl	2023	Closed	Brown	Fully filled with high-quality platinum liquid silicone, there is no better way to give a realistic effect to your reborn baby. Soft to the touch, you will feel like Lucie is a real newborn. Lucie is a hand-painted reborn baby girl, however, this does not prevent her from being put in water at normal temperature. Fully articulated thanks to the silicone filled completely in its limbs, from head to feet.	New	12	2024-03-08 22:59:54.829609+01	2024-03-08 22:59:54.829609+01
14	hh	Yes	girl	2000	green	brown	hh	new	14	2024-03-09 00:11:39.847+01	2024-03-09 00:11:39.847+01
\.


--
-- Data for Name: media; Type: TABLE DATA; Schema: public; Owner: aar
--

COPY public.media (id, photo, video, product_id, created_at, updated_at) FROM stdin;
1	public/uploads/alina.png	\N	1	2024-03-08 22:59:54.829609+01	2024-03-08 22:59:54.829609+01
2	public/uploads/sebastian.png	\N	2	2024-03-08 22:59:54.829609+01	2024-03-08 22:59:54.829609+01
3	public/uploads/lottie.png	\N	3	2024-03-08 22:59:54.829609+01	2024-03-08 22:59:54.829609+01
4	public/uploads/johnnie.png	\N	4	2024-03-08 22:59:54.829609+01	2024-03-08 22:59:54.829609+01
5	public/uploads/alina.png	\N	5	2024-03-08 22:59:54.829609+01	2024-03-08 22:59:54.829609+01
6	public/uploads/sebastian.png	\N	6	2024-03-08 22:59:54.829609+01	2024-03-08 22:59:54.829609+01
7	public/uploads/lottie.png	\N	7	2024-03-08 22:59:54.829609+01	2024-03-08 22:59:54.829609+01
8	public/uploads/johnnie.png	\N	8	2024-03-08 22:59:54.829609+01	2024-03-08 22:59:54.829609+01
9	public/uploads/alina.png	\N	9	2024-03-08 22:59:54.829609+01	2024-03-08 22:59:54.829609+01
10	public/uploads/sebastian.png	\N	10	2024-03-08 22:59:54.829609+01	2024-03-08 22:59:54.829609+01
11	public/uploads/lottie.png	\N	11	2024-03-08 22:59:54.829609+01	2024-03-08 22:59:54.829609+01
12	public/uploads/johnnie.png	\N	12	2024-03-08 22:59:54.829609+01	2024-03-08 22:59:54.829609+01
14	public/uploads/1709939499828_reborn4.jpg	\N	14	2024-03-09 00:11:39.849+01	2024-03-09 00:11:39.849+01
\.


--
-- Data for Name: message; Type: TABLE DATA; Schema: public; Owner: aar
--

COPY public.message (id, content, sender_id, receiver_id, created_at, updated_at, discussion_id) FROM stdin;
1	Hi I'm interested in your Sebastian doll, I live in San Diego.	2	1	2024-03-08 22:59:54.829609+01	2024-03-08 22:59:54.829609+01	1
2	Hi the delivery is $80. Ok for you?	1	2	2024-03-08 22:59:54.829609+01	2024-03-08 22:59:54.829609+01	1
3	Yes perfect for me.	2	1	2024-03-08 22:59:54.829609+01	2024-03-08 22:59:54.829609+01	1
4	Thanks for ordering on my shop. The reborn will be sent to you tomorrow.	1	2	2024-03-08 22:59:54.829609+01	2024-03-08 22:59:54.829609+01	1
5	hi g 	8	1	2024-03-08 23:13:06.584+01	2024-03-08 23:13:06.584+01	2
6	hi lisa	9	8	2024-03-09 00:14:11.406+01	2024-03-09 00:14:11.406+01	3
7	hi maxim	8	9	2024-03-09 00:14:51.391+01	2024-03-09 00:14:51.391+01	3
8	hiiiii	8	9	2024-03-09 00:16:35.398+01	2024-03-09 00:16:35.398+01	3
\.


--
-- Data for Name: product; Type: TABLE DATA; Schema: public; Owner: aar
--

COPY public.product (id, unique_id, title, kit_name, sculptor, size, type, weight, age_range, authenticity_card, price, shipping_fees, sold, user_id, shop_id, created_at, updated_at) FROM stdin;
4	iM3i2Y	Baby Full Silicone Girl Johnnie Closed Eyes	Johnnie	Ina Volprich	20	Silicone	7	Baby	Yes	1200	60	f	3	1	2024-03-08 22:59:54.829609+01	2024-03-08 22:59:54.829609+01
5	8uKUsu	Super Realistic, Lifelike Alina Soft Weighted Body Reborn Baby Doll Girl	Alina	Linde Scherer	20	Vinyl	6	Baby	Yes	500	50	f	3	2	2024-03-08 22:59:54.829609+01	2024-03-08 22:59:54.829609+01
6	YmD1nn	Sebastian Realistic Reborn Baby Boy	Sebastian	Olga Auer	20	Vinyl	7	Baby	Yes	650	50	f	1	1	2024-03-08 22:59:54.829609+01	2024-03-08 22:59:54.829609+01
7	NLU6Ph	Baby Toddler Girl Lottie Has Realistic Skin Blue Eyes and Brown Hair	Lottie	Laura Lee Eagles	24	Vinyl	8	Toddler	Yes	980	60	f	1	1	2024-03-08 22:59:54.829609+01	2024-03-08 22:59:54.829609+01
8	OomHcy	Baby Full Silicone Girl Johnnie Closed Eyes	Johnnie	Ina Volprich	20	Silicone	7	Baby	Yes	1200	60	f	3	1	2024-03-08 22:59:54.829609+01	2024-03-08 22:59:54.829609+01
9	NPQsEr	Super Realistic, Lifelike Alina Soft Weighted Body Reborn Baby Doll Girl	Alina	Linde Scherer	20	Vinyl	6	Baby	Yes	500	50	f	3	2	2024-03-08 22:59:54.829609+01	2024-03-08 22:59:54.829609+01
10	IFdQZE	Sebastian Realistic Reborn Baby Boy	Sebastian	Olga Auer	20	Vinyl	7	Baby	Yes	650	50	f	1	1	2024-03-08 22:59:54.829609+01	2024-03-08 22:59:54.829609+01
11	wD4TaR	Baby Toddler Girl Lottie Has Realistic Skin Blue Eyes and Brown Hair	Lottie	Laura Lee Eagles	24	Vinyl	8	Toddler	Yes	980	60	f	1	1	2024-03-08 22:59:54.829609+01	2024-03-08 22:59:54.829609+01
12	zdH5Iv	Baby Full Silicone Girl Johnnie Closed Eyes	Johnnie	Ina Volprich	20	Silicone	7	Baby	Yes	1200	60	f	3	1	2024-03-08 22:59:54.829609+01	2024-03-08 22:59:54.829609+01
14	1d0c94	hh	hh	Cindy Musgrove	2	silicone	2	toddler	yes	200	20	t	8	4	2024-03-09 00:11:39.841+01	2024-03-09 00:13:50.115+01
1	4f90d1	Super Realistic, Lifelike Alina Soft Weighted Body Reborn Baby Doll Girl	Alina	Linde Scherer	20	Vinyl	6	Baby	Yes	500	50	t	3	2	2024-03-08 22:59:54.829609+01	2024-03-12 19:21:40.17+01
2	a9d8f8	Sebastian Realistic Reborn Baby Boy	Sebastian	Olga Auer	20	Vinyl	7	Baby	Yes	650	50	t	1	1	2024-03-08 22:59:54.829609+01	2024-03-12 19:22:45.062+01
3	erlU3t	Baby Toddler Girl Lottie Has Realistic Skin Blue Eyes and Brown Hair	Lottie	Laura Lee Eagles	24	Vinyl	8	Toddler	Yes	980	60	t	1	1	2024-03-08 22:59:54.829609+01	2024-03-12 19:23:27.567+01
\.


--
-- Data for Name: shop; Type: TABLE DATA; Schema: public; Owner: aar
--

COPY public.shop (id, name, user_id, created_at, updated_at) FROM stdin;
1	Enchanted Reborn Store	1	2024-03-08 22:59:54.829609+01	2024-03-08 22:59:54.829609+01
2	Reborn Wonderful	3	2024-03-08 22:59:54.829609+01	2024-03-08 22:59:54.829609+01
4	shop 1	8	2024-03-08 23:15:28.583+01	2024-03-08 23:15:28.583+01
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: aar
--

COPY public."user" (id, first_name, last_name, username, email, password, date_of_birth, phone, address, zip_code, city, country, state, role, pro, duns, password_token, created_at, updated_at) FROM stdin;
1	Gabriela	Fernandez	GFernandez	gabriela.fernandez@gmail.com	reborn	1986-12-21 00:00:00+01	5555551234	20 W 34th St.	 10001	New York	\N	New York	Seller	Yes	150483782	\N	2024-03-08 22:59:54.829609+01	2024-03-08 22:59:54.829609+01
2	Cynthia	Smith	cynthiasmith87	cynthia.smith@yahoo.com	reborn	1987-12-05 00:00:00+01	5555555678	2760 Fifth Avenue	92103	San Diego	\N	California	Buyer	No	\N	\N	2024-03-08 22:59:54.829609+01	2024-03-08 22:59:54.829609+01
3	Mary	Doe	marydoe	mary.doe@outlook.com	reborn	1976-02-10 00:00:00+01	5556575678	1112 Northside Dr NW	30318	Atlanta	\N	Georgia	Seller/Buyer	No	\N	\N	2024-03-08 22:59:54.829609+01	2024-03-08 22:59:54.829609+01
5	Rita	Verissimo	ritav	rita.verissimo.h@gmail.com	reborn	1986-05-21 00:00:00+02	5556573239	1112 Northside Dr NW	30318	Atlanta	\N	Georgia	Admin	No	\N	\N	2024-03-08 22:59:54.829609+01	2024-03-08 22:59:54.829609+01
6	Sarah	Iritié	sarahi	sarahi@gmail.com	reborn	1976-02-10 00:00:00+01	5556574655	1112 Northside Dr NW	30318	Atlanta	\N	Georgia	Admin	No	\N	\N	2024-03-08 22:59:54.829609+01	2024-03-08 22:59:54.829609+01
4	Lisa	Boussekhane	lisab	lisab@gmail.com	reborn	1976-02-10 00:00:00+01	5556578765	1112 Northside Dr NW	30318	Atlanta	\N	Georgia	Admin	No	\N	\N	2024-03-08 22:59:54.829609+01	2024-03-08 22:59:54.829609+01
9	maxim	vo	maximv	maxim.vodeski@gmail.com	$2b$10$vQanJ0acM6pv4t3MYBD0F.7kgJeNfj5e9Zchw6Ow00llDnHhXtNxG	\N	25656458	2 rte	02565	rte	\N	la	\N	\N	\N	\N	2024-03-09 00:12:40.506+01	2024-03-09 00:13:50.097+01
8	lisa		lisab	lisa.boussekhane@gmail.com	$2b$10$aVpOsl21a8gKViykNUiode/qr6jAVCSwwrtjJukEQpmvBYNQHr/t.	\N	0253652356	2 rte	52365	rte	\N	juju	Admin	\N	\N	\N	2024-03-08 23:04:02.13+01	2024-03-12 19:23:27.55+01
\.


--
-- Name: User_Discuss_Message_id_seq; Type: SEQUENCE SET; Schema: public; Owner: aar
--

SELECT pg_catalog.setval('public."User_Discuss_Message_id_seq"', 3, true);


--
-- Name: User_Order_Product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: aar
--

SELECT pg_catalog.setval('public."User_Order_Product_id_seq"', 9, true);


--
-- Name: User_Rate_Shop_id_seq; Type: SEQUENCE SET; Schema: public; Owner: aar
--

SELECT pg_catalog.setval('public."User_Rate_Shop_id_seq"', 1, false);


--
-- Name: detail_product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: aar
--

SELECT pg_catalog.setval('public.detail_product_id_seq', 14, true);


--
-- Name: media_id_seq; Type: SEQUENCE SET; Schema: public; Owner: aar
--

SELECT pg_catalog.setval('public.media_id_seq', 14, true);


--
-- Name: message_id_seq; Type: SEQUENCE SET; Schema: public; Owner: aar
--

SELECT pg_catalog.setval('public.message_id_seq', 8, true);


--
-- Name: product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: aar
--

SELECT pg_catalog.setval('public.product_id_seq', 14, true);


--
-- Name: shop_id_seq; Type: SEQUENCE SET; Schema: public; Owner: aar
--

SELECT pg_catalog.setval('public.shop_id_seq', 4, true);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: aar
--

SELECT pg_catalog.setval('public.user_id_seq', 9, true);


--
-- Name: User_Discuss_Message User_Discuss_Message_pkey; Type: CONSTRAINT; Schema: public; Owner: aar
--

ALTER TABLE ONLY public."User_Discuss_Message"
    ADD CONSTRAINT "User_Discuss_Message_pkey" PRIMARY KEY (id);


--
-- Name: User_Order_Product User_Order_Product_pkey; Type: CONSTRAINT; Schema: public; Owner: aar
--

ALTER TABLE ONLY public."User_Order_Product"
    ADD CONSTRAINT "User_Order_Product_pkey" PRIMARY KEY (id);


--
-- Name: User_Rate_Shop User_Rate_Shop_pkey; Type: CONSTRAINT; Schema: public; Owner: aar
--

ALTER TABLE ONLY public."User_Rate_Shop"
    ADD CONSTRAINT "User_Rate_Shop_pkey" PRIMARY KEY (id);


--
-- Name: detail_product detail_product_pkey; Type: CONSTRAINT; Schema: public; Owner: aar
--

ALTER TABLE ONLY public.detail_product
    ADD CONSTRAINT detail_product_pkey PRIMARY KEY (id);


--
-- Name: media media_pkey; Type: CONSTRAINT; Schema: public; Owner: aar
--

ALTER TABLE ONLY public.media
    ADD CONSTRAINT media_pkey PRIMARY KEY (id);


--
-- Name: message message_pkey; Type: CONSTRAINT; Schema: public; Owner: aar
--

ALTER TABLE ONLY public.message
    ADD CONSTRAINT message_pkey PRIMARY KEY (id);


--
-- Name: product product_pkey; Type: CONSTRAINT; Schema: public; Owner: aar
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_pkey PRIMARY KEY (id);


--
-- Name: product product_unique_id_key; Type: CONSTRAINT; Schema: public; Owner: aar
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_unique_id_key UNIQUE (unique_id);


--
-- Name: shop shop_pkey; Type: CONSTRAINT; Schema: public; Owner: aar
--

ALTER TABLE ONLY public.shop
    ADD CONSTRAINT shop_pkey PRIMARY KEY (id);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: aar
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: User_Discuss_Message User_Discuss_Message_user1_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: aar
--

ALTER TABLE ONLY public."User_Discuss_Message"
    ADD CONSTRAINT "User_Discuss_Message_user1_id_fkey" FOREIGN KEY (user1_id) REFERENCES public."user"(id) ON DELETE CASCADE;


--
-- Name: User_Discuss_Message User_Discuss_Message_user2_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: aar
--

ALTER TABLE ONLY public."User_Discuss_Message"
    ADD CONSTRAINT "User_Discuss_Message_user2_id_fkey" FOREIGN KEY (user2_id) REFERENCES public."user"(id) ON DELETE CASCADE;


--
-- Name: User_Order_Product User_Order_Product_buyer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: aar
--

ALTER TABLE ONLY public."User_Order_Product"
    ADD CONSTRAINT "User_Order_Product_buyer_id_fkey" FOREIGN KEY (buyer_id) REFERENCES public."user"(id) ON DELETE CASCADE;


--
-- Name: User_Order_Product User_Order_Product_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: aar
--

ALTER TABLE ONLY public."User_Order_Product"
    ADD CONSTRAINT "User_Order_Product_product_id_fkey" FOREIGN KEY (product_id) REFERENCES public.product(id) ON DELETE CASCADE;


--
-- Name: User_Order_Product User_Order_Product_seller_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: aar
--

ALTER TABLE ONLY public."User_Order_Product"
    ADD CONSTRAINT "User_Order_Product_seller_id_fkey" FOREIGN KEY (seller_id) REFERENCES public."user"(id) ON DELETE CASCADE;


--
-- Name: User_Rate_Shop User_Rate_Shop_shop_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: aar
--

ALTER TABLE ONLY public."User_Rate_Shop"
    ADD CONSTRAINT "User_Rate_Shop_shop_id_fkey" FOREIGN KEY (shop_id) REFERENCES public.shop(id) ON DELETE CASCADE;


--
-- Name: User_Rate_Shop User_Rate_Shop_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: aar
--

ALTER TABLE ONLY public."User_Rate_Shop"
    ADD CONSTRAINT "User_Rate_Shop_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."user"(id) ON DELETE CASCADE;


--
-- Name: detail_product detail_product_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: aar
--

ALTER TABLE ONLY public.detail_product
    ADD CONSTRAINT detail_product_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.product(id) ON DELETE CASCADE;


--
-- Name: media fk_media_product; Type: FK CONSTRAINT; Schema: public; Owner: aar
--

ALTER TABLE ONLY public.media
    ADD CONSTRAINT fk_media_product FOREIGN KEY (product_id) REFERENCES public.product(id);


--
-- Name: message fk_user_receiver; Type: FK CONSTRAINT; Schema: public; Owner: aar
--

ALTER TABLE ONLY public.message
    ADD CONSTRAINT fk_user_receiver FOREIGN KEY (receiver_id) REFERENCES public."user"(id);


--
-- Name: message fk_user_sender; Type: FK CONSTRAINT; Schema: public; Owner: aar
--

ALTER TABLE ONLY public.message
    ADD CONSTRAINT fk_user_sender FOREIGN KEY (sender_id) REFERENCES public."user"(id);


--
-- Name: media media_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: aar
--

ALTER TABLE ONLY public.media
    ADD CONSTRAINT media_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.product(id) ON DELETE CASCADE;


--
-- Name: message message_discussion_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: aar
--

ALTER TABLE ONLY public.message
    ADD CONSTRAINT message_discussion_id_fkey FOREIGN KEY (discussion_id) REFERENCES public."User_Discuss_Message"(id) ON DELETE CASCADE;


--
-- Name: product product_shop_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: aar
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_shop_id_fkey FOREIGN KEY (shop_id) REFERENCES public.shop(id) ON DELETE CASCADE;


--
-- Name: product product_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: aar
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id) ON DELETE CASCADE;


--
-- Name: shop shop_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: aar
--

ALTER TABLE ONLY public.shop
    ADD CONSTRAINT shop_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

