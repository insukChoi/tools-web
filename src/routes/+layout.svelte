<script lang="ts">
    import '../app.postcss';
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import {
        Navbar,
        NavBrand,
        NavLi,
        NavUl,
        NavHamburger,
        Sidebar,
        SidebarGroup,
        SidebarItem,
        SidebarWrapper,
        Drawer,
        CloseButton,
        SidebarDropdownWrapper
    } from 'flowbite-svelte';
    import { Cog } from 'svelte-heros-v2';
    import { sineIn } from 'svelte/easing';
    import { DarkMode } from 'flowbite-svelte';

    let transitionParams = {
        x: -320,
        duration: 200,
        easing: sineIn
    };
    let breakPoint = 1024;
    let width: number;
    let backdrop = false;
    let activateClickOutside = true;
    let drawerHidden = false;
    $: if (width >= breakPoint) {
        drawerHidden = false;
        activateClickOutside = false;
    } else {
        drawerHidden = true;
        activateClickOutside = true;
    }
    onMount(() => {
        if (width >= breakPoint) {
            drawerHidden = false;
            activateClickOutside = false;
        } else {
            drawerHidden = true;
            activateClickOutside = true;
        }
    });
    const toggleSide = () => {
        if (width < breakPoint) {
            drawerHidden = !drawerHidden;
        }
    };
    const toggleDrawer = () => {
        drawerHidden = false;
    };
    $: activeUrl = $page.url.pathname;
    let spanClass = 'pl-2 self-center text-md text-gray-900 whitespace-nowrap dark:text-white';
    let divClass = 'w-full md:block md:w-auto pr-8';
    let ulClass = 'flex flex-col p-4 mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-lg md:font-medium';
</script>
<svelte:window bind:innerWidth={width} />
<Navbar let:hidden let:toggle>
    <NavHamburger on:click={toggleDrawer} btnClass="ml-3 lg:hidden" />
    <NavBrand href="/" class="lg:ml-64">
        <Cog />
        <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white pl-4">
      TOOLS 모음
    </span>
    </NavBrand>
    <NavHamburger on:click={toggle} />
    <NavUl {hidden} {divClass} {ulClass}>
        <NavLi href="/">Home</NavLi>
        <NavLi href="/pages/about">About</NavLi>
        <NavLi href="https://github.com/shinokada/flowbite-sveltekit-responsive-sidebar-layout"
        >GitHub</NavLi
        >
        <DarkMode class="text-lg">
            <svelte:fragment slot="lightIcon">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path fill="currentColor" d="M16 12.005a4 4 0 1 1-4 4a4.005 4.005 0 0 1 4-4m0-2a6 6 0 1 0 6 6a6 6 0 0 0-6-6ZM5.394 6.813L6.81 5.399l3.505 3.506L8.9 10.319zM2 15.005h5v2H2zm3.394 10.193L8.9 21.692l1.414 1.414l-3.505 3.506zM15 25.005h2v5h-2zm6.687-1.9l1.414-1.414l3.506 3.506l-1.414 1.414zm3.313-8.1h5v2h-5zm-3.313-6.101l3.506-3.506l1.414 1.414l-3.506 3.506zM15 2.005h2v5h-2z"/></svg>
            </svelte:fragment>
            <svelte:fragment slot="darkIcon">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path fill="currentColor" d="M13.502 5.414a15.075 15.075 0 0 0 11.594 18.194a11.113 11.113 0 0 1-7.975 3.39c-.138 0-.278.005-.418 0a11.094 11.094 0 0 1-3.2-21.584M14.98 3a1.002 1.002 0 0 0-.175.016a13.096 13.096 0 0 0 1.825 25.981c.164.006.328 0 .49 0a13.072 13.072 0 0 0 10.703-5.555a1.01 1.01 0 0 0-.783-1.565A13.08 13.08 0 0 1 15.89 4.38A1.015 1.015 0 0 0 14.98 3Z"/></svg>
            </svelte:fragment>
        </DarkMode>
    </NavUl>
</Navbar>

<Drawer
        transitionType="fly"
        {backdrop}
        {transitionParams}
        bind:hidden={drawerHidden}
        bind:activateClickOutside
        width="w-64"
        class="overflow-scroll pb-32"
        id="sidebar"
>
    <div class="flex items-center">
        <CloseButton on:click={() => (drawerHidden = true)} class="mb-4 dark:text-white lg:hidden" />
    </div>
    <Sidebar asideClass="w-54">
        <SidebarWrapper divClass="overflow-y-auto py-4 px-3 rounded dark:bg-gray-800">
            <SidebarGroup>
                <SidebarItem label="Home" href="/" on:click={toggleSide} active={activeUrl === `/`} />
                <SidebarItem
                        label="About"
                        href="/pages/about"
                        {spanClass}
                        on:click={toggleSide}
                        active={activeUrl === '/pages/about'}
                />
                <SidebarDropdownWrapper label="Tools">
                    <SidebarItem
                            label="mongo-converter"
                            href={`/tools/mongo-converter`}
                            {spanClass}
                            on:click={toggleSide}
                            active={activeUrl === '/tools/mongo-converter'}
                    />
                </SidebarDropdownWrapper>
            </SidebarGroup>
        </SidebarWrapper>
    </Sidebar>
</Drawer>
<div class="flex px-4 mx-auto w-full">
    <main class="lg:ml-72 w-full mx-auto">
        <slot />
    </main>
</div>